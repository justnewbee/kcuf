import _merge from 'lodash/merge';
import _round from 'lodash/round';
import _clamp from 'lodash/clamp';
import _cloneDeep from 'lodash/cloneDeep';

import {
  Path,
  Point,
  Angle,
  roundCoords,
  pathPointSiblingsByIndex,
  pathsAuxiliaryList,
  justifyMagnetAlongPath,
  justifyMagnetAlongPaths,
  justifyPerpendicularInternal,
  justifyPerpendicularExternal,
  justifySnapAroundPivots
} from '@kcuf/geometry-basic';
import {
  pixelRatioGet,
  pixelRatioListen
} from '@kcuf/canvas-helper';
import Subscribable from '@kcuf/subscribable';

import {
  EImageStatus,
  EMouseJustifyStatus,
  EMarkingMouseStatus,
  EMarkingStatsChangeCause,
  EZoomHow
} from '../enum';
import {
  TSize,
  TSubscribableEvents,
  IMarkingConfigItem,
  IMarkingItemClass,
  IMarkingItemConfig,
  IMarkingItemOptions,
  IMarkingItemStats,
  IMarkingPlugin,
  IMarkingPluginZoomOptions,
  IMarkingStageClass,
  IMarkingStageOptions,
  IMarkingStageStats,
  TMarkingItemFinder
} from '../types';
import {
  DEFAULT_AUXILIARY_STYLE,
  DEFAULT_JUSTIFY_MAGNET_RADIUS,
  DEFAULT_JUSTIFY_PERPENDICULAR_THRESHOLD_RADIUS,
  DEFAULT_MARKING_OPTIONS,
  DEFAULT_RIGHT_ANGLE_MARK_SIZE
} from '../const';
import {
  roundFloat,
  roundSize,
  bindDocumentEvent,
  createMarkingCanvas,
  createMarkingImageBg,
  createMarkingStage,
  getMouseJustifiedStatusMagnet,
  loadImage,
  canvasDrawPerpendicularMark
} from '../util';
import {
  pluginCursor,
  pluginFps,
  pluginMagnet,
  pluginMove,
  pluginSnapping,
  pluginStats,
  pluginTooltip,
  pluginZoom
} from '../plugin';

import MarkingItem from './marking-item';

export default class MarkingStage<T = void> extends Subscribable<TSubscribableEvents<T>> implements IMarkingStageClass<T> {
  private readonly container: HTMLElement;
  readonly options: IMarkingStageOptions<T>;
  readonly stage: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  readonly canvasContext: CanvasRenderingContext2D;
  
  imageSize: TSize = [200, 200];
  imageScale = 1;
  imageMouse: Point = [-1, -1]; // 鼠标在图片上的坐标（图片像素），即使鼠标移出，也能够保证之前画的图形不会消失
  
  private readonly markingItems: IMarkingItemClass<T>[] = [];
  
  /**
   * 缓存已加载的图片 URL 和 <img> 对象（必定成对出现）
   */
  private imageBg: HTMLDivElement;
  private imageUrl = '';
  private imageLoading = false;
  private imageLoader: HTMLImageElement | null = null;
  
  private disabled = false;
  private pixelRatio = pixelRatioGet();
  
  /**
   * 磁吸 + 正交，默认开启，按住 Alt 键临时取消
   */
  private justifying = true;
  /**
   * Snap 效果（45° 倍数角方向跳），默认不开启，按住 Shift 键启用
   */
  private snapping = false;
  /**
   * 鼠标矫正状态
   */
  private justified: EMouseJustifyStatus = EMouseJustifyStatus.NONE;
  /**
   * 外部正交时，记录直角的坐标用于画标记
   */
  private justifiedRightAngle: Angle | null = null;
  
  private plugins: IMarkingPlugin<T>[] = [];
  
  /**
   * 新建中的 MarkingItem，不计入 markingItems，在最末编辑结束后才进入（因此需单独渲染）
   */
  private itemCreating: MarkingItem<T> | null = null;
  
  // 鼠标状态
  // 鼠标相对于组件的实时坐标（屏幕像素），null 表示在组件外
  private mouseInStage: Point | null = null;
  // 鼠标相对于 canvas 的实时坐标（屏幕像素），null 表示在 canvas 外
  private mouseInCanvas: Point | null = null;
  private mouseDownCanvas = false;
  private mouseDownMoving = false;
  
  /**
   * 我们使用 MouseUp 模拟点击事件，并使用点击间隔进行双击判断，原因如下：
   *
   * 1. 原生单击事件 mousedown → mouseup → click
   * 2. 原生双击事件 mousedown → mouseup → click → mousedown → mouseup → click → dblclick
   *
   * 我们希望：
   *
   * 1. 鼠标按下拖拽后，起，不触发 click
   * 2. 双击简化为 mousedown → click → dblclick
   */
  private mouseClickTime = 0;
  
  private statsSnapshot: IMarkingStageStats<T>;
  
  /**
   * 视图放大缩小系数，每次 zoom 操作将基于 imageFitScale * zoomLevel 算出新的 scale
   */
  private zoomLevel = 1;
  
  /**
   * 画布是否可拖拽移动
   */
  private moving = false;
  /**
   * 画布移动开始的鼠标位置
   */
  private movingCoordsStart: Point | null = null;
  /**
   * 画布移动开始的画布左上角位移快照
   *
   * 鼠标位移（当前鼠标位置 - 开始移动的鼠标位置）+ movingCoordsSnapshot 即移动后的画布左上角位移
   */
  private movingCoordsSnapshot: Point = [0, 0];
  /**
   * 画布当前的瞬时位移
   */
  private movingCoords: Point = [0, 0];
  
  /**
   * 用于在销毁实例时清理副作用
   */
  private cleanups: (() => void)[] = [];
  
  constructor(container: HTMLElement, options?: IMarkingStageOptions<T>) {
    super();
    
    const safeOptions = _merge({}, DEFAULT_MARKING_OPTIONS, options);
    
    const stage = createMarkingStage();
    const imageBg = createMarkingImageBg(safeOptions.imageBgc);
    const canvas = createMarkingCanvas();
    
    stage.prepend(imageBg); // 作为其第一个元素，可以不需要设 z-index
    stage.appendChild(canvas);
    container.style.overflow = 'hidden';
    container.style.position = 'relative';
    container.appendChild(stage);
    
    this.container = container;
    this.options = safeOptions;
    this.disabled = safeOptions.disabled ?? false;
    this.stage = stage;
    this.imageBg = imageBg;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.statsSnapshot = this.getStats();
    
    this.setupEvents();
    this.setupPlugins();
    this.setupScaleSizing();
    this.setupImageAndItems(safeOptions.image, safeOptions.items, EMarkingStatsChangeCause.INIT);
  }
  
  private get imageFitScale(): number {
    const {
      stage,
      imageLoader
    } = this;
    
    if (!imageLoader) {
      return 1;
    }
    
    const rect = stage.getBoundingClientRect();
    const imageScaleW = rect.width / imageLoader.naturalWidth;
    const imageScaleH = rect.height / imageLoader.naturalHeight;
    
    // 容器能完整放下
    if (imageScaleW >= 1 && imageScaleH >= 1) {
      return 1;
    }
    
    // 宽比大于高比，则定高，宽度自适应；否则定宽，高度自适应
    return roundFloat(imageScaleW > imageScaleH ? imageScaleH : imageScaleW);
  }
  
  private get itemHovering(): IMarkingItemClass<T> | null {
    return this.markingItems.find(v => v.stats.hovering) || null;
  }
  
  private get itemHighlighting(): IMarkingItemClass<T> | null {
    return this.markingItems.find(v => v.stats.highlighting) || null;
  }
  
  private get itemEditing(): IMarkingItemClass<T> | null {
    return this.markingItems.find(v => v.stats.editing) || null;
  }
  
  private get itemUnderMouse(): IMarkingItemClass<T> | null {
    return this.itemCreating ? null : this.getMarkingItemsOrdered().findLast(v => v.isUnderMouse()) || null;
  }
  
  private get pluginZoomOptions(): Required<IMarkingPluginZoomOptions> | null {
    const {
      options
    } = this;
    
    if (!options.pluginZoom) {
      return null;
    }
    
    const o: Required<IMarkingPluginZoomOptions> = {
      step: 0.25,
      stepWheel: 0.05,
      min: 0.2,
      max: 4
    };
    
    return options.pluginZoom === true ? o : {
      ...o,
      ...options.pluginZoom
    };
  }
  
  private getOptionJustifyPerpendicularThresholdRadius(): number {
    const {
      options: {
        justifyPerpendicularThresholdRadius = DEFAULT_JUSTIFY_PERPENDICULAR_THRESHOLD_RADIUS
      }
    } = this;
    
    return this.fromCanvasPixelToImagePixel(justifyPerpendicularThresholdRadius);
  }
  
  /**
   * 返回根据面积降序的 MarkingItem 列表（注意不会影响 this.markingItems）
   */
  private getMarkingItemsOrdered(): IMarkingItemClass<T>[] {
    const {
      markingItems,
      itemEditing
    } = this;
    const list = [...markingItems];
    
    return list.sort((v1, v2) => {
      // 保证编辑未完成（dirty 状态）的一定在最末一个
      if (v2 === itemEditing && v2.stats.dirty) {
        return -1;
      }
      
      if (v1 === itemEditing && v1.stats.dirty) {
        return 1;
      }
      
      return v2.stats.area - v1.stats.area;
    });
  }
  
  private getAllStats(excludeEditing?: boolean): IMarkingItemStats<T>[] {
    const {
      itemEditing
    } = this;
    
    return (excludeEditing && itemEditing ? this.markingItems.filter(v => v !== itemEditing) : this.markingItems).map(v => v.stats);
  }
  
  private getAllPaths(excludeEditing?: boolean): Path[] {
    return this.getAllStats(excludeEditing).map(v => v.path);
  }
  
  private getMouseInStageFromMouseEvent(e: MouseEvent): Point {
    const rectStage = this.stage.getBoundingClientRect();
    
    return roundCoords([
      _clamp(e.clientX - rectStage.left, 0, rectStage.width),
      _clamp(e.clientY - rectStage.top, 0, rectStage.height)
    ]);
  }
  
  private getMouseInCanvasFromMouseEvent(e: MouseEvent): Point {
    const rectCanvas = this.canvas.getBoundingClientRect();
    
    return this.roundClampCoordsInCanvas([e.clientX - rectCanvas.left, e.clientY - rectCanvas.top]);
  }
  
  private setupEvents(): void {
    const {
      stage,
      canvas
    } = this;
    const resizeObserver = new ResizeObserver((): void => this.handleResize());
    
    resizeObserver.observe(stage);
    
    stage.addEventListener('mouseenter', (e: MouseEvent): void => this.handleMouseEnterStage(e));
    stage.addEventListener('mouseleave', (): void => this.handleMouseLeaveStage()); // 这里不用捕获阶段
    stage.addEventListener('mousemove', (e: MouseEvent): void => this.handleMouseMoveStage(e), true);
    
    canvas.addEventListener('mouseenter', (): void => this.handleMouseEnterCanvas());
    canvas.addEventListener('mouseleave', (e: MouseEvent): void => this.handleMouseLeaveCanvas(e));
    canvas.addEventListener('mousemove', (): void => this.handleMouseMoveCanvas());
    canvas.addEventListener('mousedown', (): void => this.handleMouseDownCanvas(), true);
    
    // 添加消除副作用的清理方法
    this.cleanups.push(bindDocumentEvent('mouseup', (): void => this.handleMouseUpWindow(), true));
    this.cleanups.push(bindDocumentEvent('keydown', (e: KeyboardEvent): void => this.handleKeyDownWindow(e), true));
    this.cleanups.push(() => resizeObserver.disconnect());
    this.cleanups.push(pixelRatioListen(pixelRatio => this.updatePixelRatio(pixelRatio)));
  }
  
  private setupPlugins(): void {
    const {
      options,
      plugins,
      pluginZoomOptions
    } = this;
    
    // 默认必需插件
    plugins.push(pluginCursor(this));
    
    // 可选插件
    if (options.pluginTooltip !== false) {
      plugins.push(pluginTooltip(this, options.pluginTooltip === true ? undefined : options.pluginTooltip));
    }
    
    if (pluginZoomOptions) {
      plugins.push(pluginZoom(this));
    }
    
    plugins.push(pluginMagnet(this));
    plugins.push(pluginSnapping(this));
    
    if (options.pluginMove) {
      plugins.push(pluginMove(this));
    }
    
    if (options.pluginFps) {
      plugins.push(pluginFps(this));
    }
    
    if (options.pluginStats) {
      plugins.push(pluginStats(this));
    }
  }
  
  private setupImageAndItems(imageUrl = '', items: IMarkingConfigItem<T>[] = [], cause: EMarkingStatsChangeCause = EMarkingStatsChangeCause.SET_DATA): void {
    this.markingItems.length = 0;
    
    items.forEach(v => {
      this.markingItems.push(this.createMarkingItem(v));
    });
    
    this.setupImage(imageUrl).then(() => this.updateAndDraw(cause)); // 保证图片加载完成再渲染 MarkingItem
  }
  
  private async setupImage(imageUrl: string): Promise<void> {
    if (imageUrl === this.imageUrl) { // 避免相同的图片重复加载渲染造成的闪现
      return;
    }
    
    const {
      imageBg
    } = this;
    
    imageBg.style.transition = 'none'; // 为了保证切图的时候，新图不产生残影
    imageBg.style.opacity = '0'; // 若有图，则等加载完再显示
    imageBg.style.backgroundImage = imageUrl ? `url(${imageUrl})` : 'none';
    
    this.moveTo([0, 0]);
    this.imageUrl = imageUrl;
    this.imageLoader = null;
    this.setupScaleSizing();
    
    if (imageUrl) {
      this.imageLoading = true;
      
      this.updateAndDraw(EMarkingStatsChangeCause.LOADING_IMAGE);
      
      try {
        this.imageLoader = await loadImage(imageUrl);
        
        imageBg.style.transition = 'opacity 200ms ease-in-out';
        imageBg.style.opacity = '1';
      } catch (_err) {
        this.imageUrl = ''; // 再次设置，可以重新加载
      }
      
      this.setupScaleSizing();
      this.imageLoading = false;
    }
  }
  
  /**
   * 根据容器大小、图片本身大小等，计算并设置 canvas 的大小和位置
   */
  private setupScaleSizing(zoomLevel = 1): void {
    const {
      canvas,
      imageBg,
      imageLoader,
      pixelRatio
    } = this;
    
    this.zoomLevel = roundFloat(zoomLevel);
    this.imageScale = roundFloat(this.imageFitScale * zoomLevel);
    
    const rect = this.stage.getBoundingClientRect();
    const width = Math.round((imageLoader?.naturalWidth || rect.width) * this.imageScale);
    const height = Math.round((imageLoader?.naturalHeight || rect.height) * this.imageScale);
    const top = Math.round((rect.height - height) / 2);
    const left = Math.round((rect.width - width) / 2);
    
    imageBg.style.width = `${width}px`;
    imageBg.style.height = `${height}px`;
    imageBg.style.top = `${top}px`;
    imageBg.style.left = `${left}px`;
    
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.top = `${top}px`;
    canvas.style.left = `${left}px`;
  }
  
  private updatePixelRatio(pixelRatio: number): void {
    this.pixelRatio = pixelRatio;
    this.setupScaleSizing();
    this.draw();
  }
  
  /**
   * 是否正在双击中
   */
  private isDoubleClicking(): boolean {
    const {
      options: {
        doubleClickInterval = 200
      },
      mouseClickTime
    } = this;
    
    return Date.now() - mouseClickTime <= doubleClickInterval;
  }
  
  private createMarkingItem(extraOptions?: IMarkingItemOptions<T>): MarkingItem<T> {
    const {
      options
    } = this;
    
    return new MarkingItem<T>(this, {
      // TODO 提取一个专门的属性包揽所有样式
      borderStyle: options.borderStyle,
      borderStyleHovering: options.borderStyleHovering,
      borderStyleHighlighting: options.borderStyleHighlighting,
      borderStyleEditing: options.borderStyleEditing,
      pointStyle: options.pointStyle,
      pointStyleHovering: options.pointStyleHovering,
      pointStyleHighlighting: options.pointStyleHighlighting,
      pointStyleEditing: options.pointStyleEditing,
      fillStyle: options.fillStyle,
      fillStyleHovering: options.fillStyleHovering,
      fillStyleHighlighting: options.fillStyleHighlighting,
      fillStyleEditing: options.fillStyleEditing,
      pointCountMin: options.pointCountMin,
      pointCountMax: options.pointCountMax,
      ...extraOptions,
      pointInsertionMinDistance: options.pointInsertionMinDistance,
      noPointInsertion: options.noPointInsertion,
      noCrossingDetection: options.noCrossingDetection,
      noDragWhole: options.noDragWhole
    });
  }
  
  private creatingPushPoint(): void {
    if (!this.mouseInCanvas || !this.itemCreating) {
      return;
    }
    
    switch (this.itemCreating.pushPoint()) {
    case 'close':
    case 'last':
      this.finishCreating();
      
      break;
    default:
      break;
    }
  }
  
  private handleResize(): void {
    this.setupScaleSizing();
    this.updateAndDraw(EMarkingStatsChangeCause.RESIZE);
  }
  
  private handleMouseEnterStage(e: MouseEvent): void {
    this.mouseInStage = this.getMouseInStageFromMouseEvent(e);
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_ENTER_STAGE);
  }
  
  private handleMouseLeaveStage(): void {
    this.mouseInStage = null;
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_LEAVE_STAGE);
  }
  
  private handleMouseMoveStage(e: MouseEvent): void {
    this.mouseInStage = this.getMouseInStageFromMouseEvent(e);
    
    if (this.mouseInCanvas) {
      if (this.mouseDownCanvas) {
        this.mouseDownMoving = true;
      }
      
      const {
        moving,
        itemCreating,
        itemEditing
      } = this;
      
      if (moving || itemCreating || !itemEditing) {
        return;
      }
      
      const draggingResult = itemEditing.processDragging();
      
      if (typeof draggingResult === 'number') {
        const statsList = this.getAllStats();
        
        this.options.onPointInsert?.(itemEditing.stats, draggingResult, statsList);
        this.emit('point-insert', itemEditing.stats, draggingResult, statsList);
      }
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_MOVE_STAGE);
  }
  
  private handleMouseEnterCanvas(): void {
    this.refreshMouseCoordsInCanvas();
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_ENTER_CANVAS);
  }
  
  private handleMouseLeaveCanvas(e: MouseEvent): void {
    this.mouseInCanvas = null;
    this.hoverMarkingItem(null);
    this.updateImageMouse(this.getMouseInCanvasFromMouseEvent(e)); // 避免出现空隙
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_LEAVE_CANVAS);
  }
  
  private handleMouseMoveCanvas(): void {
    this.refreshMouseCoordsInCanvas();
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_MOVE_CANVAS);
  }
  
  private handleMouseDownCanvas(): void {
    this.mouseDownCanvas = true;
    this.creatingPushPoint();
    
    if (this.isDoubleClicking()) {
      return;
    }
    
    if (!this.moving) {
      this.itemEditing?.startDragging();
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_DOWN_CANVAS);
  }
  
  private handleMouseUpWindow(): void {
    const {
      itemEditing,
      mouseInStage,
      mouseDownMoving
    } = this;
    
    this.mouseDownCanvas = false;
    this.mouseDownMoving = false;
    
    this.creatingPushPoint();
    
    if (this.moving) {
      return;
    }
    
    if (itemEditing?.finishDragging(this.options.beforeEditDragEnd)) {
      this.clearJustified();
      
      const statsList = this.getAllStats();
      
      this.options.onDragEnd?.(itemEditing.stats, statsList);
      this.emit('drag-end', itemEditing.stats, statsList);
    }
    
    if (mouseDownMoving) {
      this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_UP_WINDOW);
      
      return;
    }
    
    if (!mouseInStage) {
      return;
    }
    
    const doubleClicking = this.isDoubleClicking();
    
    this.mouseClickTime = doubleClicking ? 0 : Date.now();
    
    if (doubleClicking) {
      this.actOnMouseClickDouble();
    } else {
      this.actOnMouseClick();
    }
    
    this.updateAndDraw(doubleClicking ? EMarkingStatsChangeCause.MOUSE_DOUBLE_CLICK_CANVAS : EMarkingStatsChangeCause.MOUSE_CLICK_CANVAS);
  }
  
  private handleKeyDownWindow(e: KeyboardEvent): void {
    if (!this.mouseInStage || this.moving || e.repeat) {
      return;
    }
    
    const {
      itemCreating,
      itemEditing
    } = this;
    
    if (itemCreating) {
      switch (e.key) {
      case ' ': // 空格：添加节点
        this.creatingPushPoint();
        this.updateAndDraw(EMarkingStatsChangeCause.KEYBOARD_PUSH_POINT);
        
        break;
      case 'Enter': // 回车：添加节点并完成新建
        this.creatingPushPoint();
        this.finishCreating();
        
        break;
      case 'Escape': // ESC：取消新建
        e.preventDefault();
        e.stopPropagation();
        
        this.cancelCreating();
        
        break;
      case 'Backspace': // BACKSPACE/DELETE：删除最末点
      case 'Delete':
        if (itemCreating.removePoint() >= 0) {
          this.updateAndDraw(EMarkingStatsChangeCause.KEYBOARD_REMOVE_POINT);
        }
        
        break;
      default:
        break;
      }
    }
    
    if (itemEditing) {
      switch (e.key) {
      case 'Enter':
        this.finishEditing();
        this.updateAndDraw(EMarkingStatsChangeCause.KEYBOARD_FINISH_EDITING);
        
        break;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        
        this.finishEditing(true);
        this.updateAndDraw(EMarkingStatsChangeCause.KEYBOARD_CANCEL_EDITING);
        
        break;
      case 'Backspace':
      case 'Delete':
        this.deleteActiveItem();
        
        break;
      default:
        break;
      }
    }
  }
  
  private actOnMouseClick(): void {
    const {
      itemCreating,
      itemUnderMouse,
      itemHighlighting
    } = this;
    
    itemHighlighting?.toggleHighlighting(false);
    
    if (itemUnderMouse) {
      const statsList = this.getAllStats();
      
      this.options.onClick?.(itemUnderMouse.stats, statsList);
      this.emit('click', itemUnderMouse.stats, statsList);
    }
    
    if (!itemCreating) {
      this.select(itemUnderMouse);
    }
  }
  
  private actOnMouseClickDouble(): void {
    const {
      itemCreating,
      itemEditing
    } = this;
    
    if (itemCreating) { // 新建中，结束新建（可能取消或完成）
      this.finishCreating();
      
      return;
    }
    
    if (!itemEditing) {
      return;
    }
    
    switch (itemEditing.checkMouse()) {
    case EMarkingMouseStatus.OUT:
      this.select(null);
      
      break;
    case EMarkingMouseStatus.IN_POINT: {
      const pointRemovedIndex = itemEditing.removePoint();
      
      if (pointRemovedIndex >= 0) {
        const statsList = this.getAllStats();
        
        this.options.onPointRemove?.(itemEditing.stats, pointRemovedIndex, statsList);
        this.emit('point-remove', itemEditing.stats, pointRemovedIndex, statsList);
      }
      
      break;
    }
    case EMarkingMouseStatus.IN_POINT_INSERTION: // 点中点不做任何事情
      return;
    default:
      this.select(null);
      
      break;
    }
  }
  
  /**
   * 每次 render 之前，需更新所有 MarkingItem 的状态，以及本身的状态
   */
  private updateStats(cause: EMarkingStatsChangeCause): void {
    const {
      canvas,
      imageLoader
    } = this;
    const rectCanvas = canvas.getBoundingClientRect();
    
    this.imageSize = [
      roundFloat(imageLoader?.naturalWidth || rectCanvas.width, 1),
      roundFloat(imageLoader?.naturalHeight || rectCanvas.height, 1)
    ];
    
    // 先更新所有 MarkingItem 的 stats
    this.itemCreating?.refreshStats();
    this.markingItems.forEach(v => {
      v.refreshStats();
    });
    
    const stats = this.getStats();
    
    this.statsSnapshot = stats;
    this.plugins.forEach(v => v.run?.call(this, stats, cause)); // 每次状态更新都必须运行 plugin
    this.options.onStatsChange?.(this.statsSnapshot, cause);
    this.emit('stats-change', this.statsSnapshot, cause);
  }
  
  /**
   * 更新 stats 并渲染
   */
  private updateAndDraw(cause: EMarkingStatsChangeCause): void {
    this.updateStats(cause);
    this.draw();
  }
  
  private roundClampCoordsInCanvas([x, y]: Point): Point {
    const rectCanvas = this.canvas.getBoundingClientRect();
    
    return roundCoords([
      _clamp(x, 0, rectCanvas.width),
      _clamp(y, 0, rectCanvas.height)
    ]);
  }
  
  private roundClampCoordsInImage([x, y]: Point): Point {
    const {
      imageSize
    } = this;
    
    return roundCoords([
      _clamp(x, 0, imageSize[0]),
      _clamp(y, 0, imageSize[1])
    ]);
  }
  
  /**
   * 刷新 canvas 鼠标信息
   */
  private refreshMouseCoordsInCanvas(): void {
    const rectStage = this.stage.getBoundingClientRect();
    const rectCanvas = this.canvas.getBoundingClientRect();
    const mouseInCanvas = this.mouseInStage ? this.roundClampCoordsInCanvas([
      this.mouseInStage[0] - (rectCanvas.left - rectStage.left),
      this.mouseInStage[1] - (rectCanvas.top - rectStage.top)
    ]) : null;
    const {
      itemCreating,
      itemEditing,
      moving
    } = this;
    
    this.mouseInCanvas = mouseInCanvas;
    this.updateImageMouse(mouseInCanvas);
    
    if (!mouseInCanvas || moving || itemCreating || itemEditing?.stats.dragging) {
      this.hoverMarkingItem(null);
    } else {
      this.hoverMarkingItem(this.itemUnderMouse);
    }
  }
  
  /**
   * 图片有缩放，有写场景下我们需要将肉眼看到相对于 canvas 的坐标转换成相对于 image 的坐标
   */
  private fromCanvasPixelToImagePixel(canvasPixel: number): number {
    return canvasPixel / this.imageScale;
  }
  
  private fromCanvasCoordsToImageCoords(canvasCoords: Point): Point {
    return [canvasCoords[0] / this.imageScale, canvasCoords[1] / this.imageScale];
  }
  
  private clearJustified(): void {
    this.justified = EMouseJustifyStatus.NONE;
    this.justifiedRightAngle = null;
  }
  
  /**
   * 根据图片大小、缩放、是否磁吸、是否 Snap，换算出鼠标所指像素位置相对于图片的 100% 坐标
   */
  private updateImageMouse(mouseInCanvas: Point | null): void {
    this.clearJustified();
    
    if (!mouseInCanvas) {
      return;
    }
    
    this.imageMouse = this.roundClampCoordsInImage(this.fromCanvasCoordsToImageCoords(mouseInCanvas)); // 鼠标坐标转成图片内部坐标
    
    this.justifyImageMouseMagnet() || this.justifyImageMousePerpendicularInternal() || this.justifyImageMousePerpendicularExternal() || this.justifyImageMouseSnap();
  }
  
  /**
   * 磁吸，先从正在新建或编辑的图形自身找，再找其他
   */
  private justifyImageMouseMagnet(): boolean {
    if (!this.justifying) {
      return false;
    }
    
    const {
      options: {
        magnetRadius: magnetRadius0 = DEFAULT_JUSTIFY_MAGNET_RADIUS
      }
    } = this;
    const magnetRadius = this.fromCanvasPixelToImagePixel(magnetRadius0);
    
    if (magnetRadius <= 0) {
      return false;
    }
    
    const {
      imageMouse,
      itemCreating,
      itemEditing
    } = this;
    const creatingStats = itemCreating?.stats;
    const editingStats = itemEditing?.stats;
    
    let justifiedResult = creatingStats ? justifyMagnetAlongPath(imageMouse, creatingStats.path, magnetRadius) : null;
    
    justifiedResult ||= editingStats && editingStats.draggingPointIndex >= 0 ? justifyMagnetAlongPath(imageMouse, editingStats.path.filter((_v, i) => {
      return i !== editingStats.draggingPointIndex;
    }), magnetRadius) : null;
    
    justifiedResult ||= justifyMagnetAlongPaths(imageMouse, this.getAllPaths(true), magnetRadius);
    
    if (justifiedResult) {
      this.justified = getMouseJustifiedStatusMagnet(justifiedResult);
      this.imageMouse = this.roundClampCoordsInImage(justifiedResult.point);
      
      this.justifyImageMousePerpendicularExternal(); // 磁吸的时候，还需要进一步
    }
    
    return !!justifiedResult;
  }
  
  /**
   * 正在新建或编辑的图形，内部自动垂直正交矫正
   */
  private justifyImageMousePerpendicularInternal(): boolean {
    if (!this.justifying) {
      return false;
    }
    
    const creatingStats = this.itemCreating?.stats;
    const editingStats = this.itemEditing?.stats;
    let pathToJustifyPerpendicular: Path | undefined;
    
    if (creatingStats) {
      pathToJustifyPerpendicular = creatingStats.path;
    } else if (editingStats && editingStats.draggingPointIndex >= 0) {
      const pathBefore = editingStats.path.slice(0, editingStats.draggingPointIndex);
      const pathAfter = editingStats.path.slice(editingStats.draggingPointIndex + 1);
      
      pathToJustifyPerpendicular = [...pathAfter, ...pathBefore];
    }
    
    const justifiedResult = pathToJustifyPerpendicular ? justifyPerpendicularInternal(this.imageMouse, pathToJustifyPerpendicular, {
      radius: this.getOptionJustifyPerpendicularThresholdRadius()
    }) : null;
    
    if (justifiedResult) {
      this.justified = EMouseJustifyStatus.PERPENDICULAR_INTERNAL;
      this.imageMouse = this.roundClampCoordsInImage(justifiedResult.point);
    }
    
    return !!justifiedResult;
  }
  
  /**
   * 正在新建或编辑的图形，若只有两个点（即线段），且一端磁吸在别的图形的一条边，则进行正交矫正
   */
  private justifyImageMousePerpendicularExternal(): boolean {
    if (!this.justifying) {
      return false;
    }
    
    const creatingStats = this.itemCreating?.stats;
    const editingStats = this.itemEditing?.stats;
    let pivot: Point | undefined;
    
    if (creatingStats?.path.length === 1) {
      pivot = creatingStats.path[0];
    } else if (editingStats?.path.length === 2 && editingStats.draggingPointIndex >= 0) {
      pivot = editingStats.path[editingStats.draggingPointIndex === 0 ? 1 : 0];
    }
    
    const justifiedResult = pivot ? justifyPerpendicularExternal(this.imageMouse, pivot, this.getAllPaths(true), {
      radius: this.getOptionJustifyPerpendicularThresholdRadius()
    }) : null;
    
    if (justifiedResult) {
      this.justified = EMouseJustifyStatus.PERPENDICULAR_EXTERNAL;
      this.justifiedRightAngle = justifiedResult.angle;
      this.imageMouse = this.roundClampCoordsInImage(justifiedResult.point);
    }
    
    return !!justifiedResult;
  }
  
  private justifyImageMouseSnap(): boolean {
    if (!this.snapping) {
      return false;
    }
    
    const {
      imageMouse
    } = this;
    const creatingStats = this.itemCreating?.stats;
    const editingStats = this.itemEditing?.stats;
    let pivot1: Point | undefined;
    let pivot2: Point | undefined;
    
    if (creatingStats) {
      pivot1 = creatingStats.path[creatingStats.path.length - 1];
    } else if (editingStats) {
      const siblingPoints = pathPointSiblingsByIndex(editingStats.path, editingStats.draggingPointIndex);
      
      if (siblingPoints.length === 1) {
        pivot1 = siblingPoints[0];
      } else if (siblingPoints.length === 2) {
        pivot1 = siblingPoints[0];
        pivot2 = siblingPoints[1];
      }
    }
    
    const justifiedResult = justifySnapAroundPivots(imageMouse, [pivot1, pivot2]);
    
    if (justifiedResult) {
      this.justified = EMouseJustifyStatus.SNAP;
      this.imageMouse = this.roundClampCoordsInImage(justifiedResult.point);
    }
    
    return !!justifiedResult;
  }
  
  private hoverMarkingItem(markingItem: IMarkingItemClass<T> | null): void {
    this.markingItems.forEach(v => {
      v.toggleHovering(v === markingItem);
    });
    
    if (markingItem) {
      this.itemHighlighting?.toggleHighlighting(false);
    }
  }
  
  /**
   * 画线与某边的正交直角标记，只有一个
   */
  private drawPerpendicularMark(): void {
    const {
      justifiedRightAngle
    } = this;
    const activeItem = this.itemEditing || this.itemCreating;
    
    if (!justifiedRightAngle || !activeItem) {
      return;
    }
    
    const {
      options: {
        PerpendicularMarkSize = DEFAULT_RIGHT_ANGLE_MARK_SIZE
      },
      canvasContext,
      imageScale
    } = this;
    
    canvasDrawPerpendicularMark(canvasContext, justifiedRightAngle, {
      scale: imageScale,
      size: PerpendicularMarkSize,
      color: activeItem.getBorderColor()
    });
  }
  
  private drawAuxiliaryLines(): void {
    if (this.justified) { // 正在磁吸不画引导线
      return;
    }
    
    const {
      options,
      canvasContext,
      itemCreating,
      itemEditing,
      imageMouse
    } = this;
    let activePath: Path | undefined;
    
    if (itemCreating) {
      activePath = [imageMouse];
    } else if (itemEditing) {
      activePath = itemEditing.stats.path;
    }
    
    if (!activePath) {
      return;
    }
    
    const auxiliarySegmentList = pathsAuxiliaryList(this.markingItems.filter(v => v !== itemEditing).map(v => v.stats.path), activePath);
    
    if (!auxiliarySegmentList.length) {
      return;
    }
    
    const auxiliaryLineOptions = {
      ...DEFAULT_AUXILIARY_STYLE,
      ...options.auxiliaryLine
    };
    
    canvasContext.save();
    canvasContext.strokeStyle = auxiliaryLineOptions.color;
    canvasContext.lineWidth = this.fromCanvasPixelToImagePixel(auxiliaryLineOptions.width);
    
    auxiliarySegmentList.forEach(v => {
      canvasContext.beginPath();
      canvasContext.moveTo(v[0][0], v[0][1]);
      canvasContext.lineTo(v[1][0], v[1][1]);
      canvasContext.closePath();
      canvasContext.stroke();
    });
    
    canvasContext.restore();
  }
  
  private drawItems(): void {
    const {
      mouseInCanvas,
      itemCreating,
      itemHighlighting
    } = this;
    
    this.getMarkingItemsOrdered().forEach(v => v.draw(itemHighlighting ? v !== itemHighlighting : false));
    
    if (itemCreating && (mouseInCanvas || itemCreating.stats.path.length)) {
      itemCreating.draw();
    }
  }
  
  private findItem(finder: TMarkingItemFinder<T>, givenItem: IMarkingItemClass<T> | null): IMarkingItemClass<T> | null {
    const {
      markingItems
    } = this;
    
    if (finder === null) {
      return null;
    }
    
    if (finder === 'first') {
      return markingItems[0] || null;
    }
    
    if (finder === 'last') {
      return markingItems[markingItems.length - 1] || null;
    }
    
    if (typeof finder === 'number') {
      let nextIndex = markingItems.findIndex(v => v === givenItem) + finder;
      
      // 使其循环能够循环，比如用于 Tab 事件
      if (nextIndex > markingItems.length - 1) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = markingItems.length - 1;
      }
      
      return markingItems[nextIndex] || null;
    }
    
    return this.markingItems.find(v => v.stats.data && finder(v.stats.data)) || null;
  }
  
  private select(item: IMarkingItemClass<T> | null): void {
    const {
      disabled,
      itemEditing
    } = this;
    
    if (disabled || item === itemEditing) {
      return;
    }
    
    this.finishEditing();
    item?.select();
    
    const itemStats = item ? item.stats : null;
    const statsList = this.getAllStats();
    
    this.options.onSelectionChange?.(itemStats, statsList);
    this.emit('selection-change', itemStats, statsList);
  }
  
  private zoomBy(inOut: boolean, wheel?: boolean): void {
    const {
      pluginZoomOptions
    } = this;
    
    if (!pluginZoomOptions) {
      return;
    }
    
    const {
      step,
      stepWheel,
      min,
      max
    } = pluginZoomOptions;
    const delta = (inOut ? 1 : -1) * (wheel ? stepWheel : step);
    const {
      zoomLevel
    } = this;
    let zoomLevelNext = _round(zoomLevel + delta, 4);
    
    if (zoomLevelNext > max) {
      zoomLevelNext = max;
    }
    
    if (zoomLevelNext < min) {
      zoomLevelNext = min;
    }
    
    this.zoomTo(zoomLevelNext, delta > 0 ? EMarkingStatsChangeCause.ZOOM_IN : EMarkingStatsChangeCause.ZOOM_OUT);
  }
  
  private zoomTo(zoomLevelNext: number, cause: EMarkingStatsChangeCause): void {
    const {
      zoomLevel
    } = this;
    
    if (zoomLevel === zoomLevelNext) {
      return;
    }
    
    this.setupScaleSizing(zoomLevelNext);
    this.updateAndDraw(cause);
    this.refreshMouseCoordsInCanvas();
    this.options.onZoomChange?.(zoomLevelNext, zoomLevel);
    this.emit('zoom-change', zoomLevelNext, zoomLevel);
    
    // TODO 要做这个事情
    // // 根据缩放前后鼠标在 canvas 上的相对位置变化（后 - 前）
    // const [x, y] = this.mouseInCanvas;
    // const dx = x - x0;
    // const dy = y - y0;
    //
    // this.moveBy(dx / 2, dy / 2);
  }
  
  private zoomMin(): void {
    const {
      pluginZoomOptions
    } = this;
    
    if (pluginZoomOptions) {
      this.zoomTo(pluginZoomOptions.min, EMarkingStatsChangeCause.ZOOM_MIN);
    }
  }
  
  private zoomMax(): void {
    const {
      pluginZoomOptions
    } = this;
    
    if (pluginZoomOptions) {
      this.zoomTo(pluginZoomOptions.max, EMarkingStatsChangeCause.ZOOM_MAX);
    }
  }
  
  private zoomReset(): void {
    this.zoomTo(1, EMarkingStatsChangeCause.ZOOM_RESET);
    this.moveTo([0, 0]);
  }
  
  setData(imageUrl?: string, markings: IMarkingConfigItem<T>[] = []): void {
    this.cancelCreating();
    this.setupImageAndItems(imageUrl, markings);
  }
  
  toggleDisabled(disabled = !this.disabled): void {
    if (this.disabled === disabled) {
      return;
    }
    
    this.disabled = disabled;
    
    if (this.disabled) {
      this.cancelCreating();
      this.finishEditing();
    }
    
    this.updateAndDraw(disabled ? EMarkingStatsChangeCause.TOGGLE_DISABLED_TRUE : EMarkingStatsChangeCause.TOGGLE_DISABLED_FALSE);
  }
  
  toggleJustify(enabled = true): void {
    if (this.justifying === enabled) {
      return;
    }
    
    this.justifying = enabled;
    this.updateImageMouse(this.mouseInCanvas);
    this.itemEditing?.processDragging(); // 否则不会立即产生效果
    this.updateAndDraw(enabled ? EMarkingStatsChangeCause.TOGGLE_JUSTIFY_TRUE : EMarkingStatsChangeCause.TOGGLE_JUSTIFY_FALSE);
  }
  
  toggleSnap(enabled = true): void {
    if (this.snapping === enabled) {
      return;
    }
    
    this.snapping = enabled;
    this.updateImageMouse(this.mouseInCanvas);
    this.itemEditing?.processDragging(); // 否则不会立即产生效果
    this.updateAndDraw(enabled ? EMarkingStatsChangeCause.TOGGLE_SNAP_TRUE : EMarkingStatsChangeCause.TOGGLE_SNAP_FALSE);
  }
  
  startCreating(extraOptions?: IMarkingItemConfig): void {
    const {
      disabled
    } = this;
    
    if (disabled) {
      return;
    }
    
    this.cancelCreating(); // 副作用 - 取消正在进行的新建（有的话）
    
    this.moveEnd(); // 副作用 - 结束移动
    this.hoverMarkingItem(null); // 副作用 - 取消 hover
    
    if (this.itemEditing) { // 副作用 - 结束编辑
      this.finishEditing();
      
      const statsList = this.getAllStats();
      
      this.options.onSelectionChange?.(null, statsList);
      this.emit('selection-change', null, statsList);
    }
    
    this.itemCreating = this.createMarkingItem(extraOptions);
    this.updateAndDraw(EMarkingStatsChangeCause.START_CREATING);
    
    this.options.onCreateStart?.();
    this.emit('create-start');
  }
  
  finishCreating(): void {
    const {
      itemCreating
    } = this;
    
    if (!itemCreating?.finishCreating(this.options.beforeCreateComplete)) {
      return;
    }
    
    this.clearJustified();
    
    this.itemCreating = null;
    this.markingItems.push(itemCreating);
    
    const statsList = this.getAllStats();
    
    this.options.onCreateComplete?.(itemCreating.stats, statsList);
    this.emit('create-complete', itemCreating.stats, statsList);
    
    this.select(itemCreating);
    
    this.updateAndDraw(EMarkingStatsChangeCause.FINISH_CREATING);
  }
  
  cancelCreating(): void {
    if (this.itemCreating) {
      this.clearJustified();
      
      this.itemCreating = null;
      this.updateAndDraw(EMarkingStatsChangeCause.CANCEL_CREATING);
      this.options.onCreateCancel?.();
      this.emit('create-cancel');
    }
  }
  
  finishEditing(cancel?: boolean): void {
    const {
      itemEditing
    } = this;
    
    if (itemEditing?.finishEditing(cancel)) {
      this.clearJustified();
      
      const statsList = this.getAllStats();
      
      if (cancel) {
        this.options.onEditCancel?.(itemEditing.stats, statsList);
        this.emit('edit-cancel', itemEditing.stats, statsList);
      } else {
        this.options.onEditComplete?.(itemEditing.stats, statsList);
        this.emit('edit-complete', itemEditing.stats, statsList);
      }
    }
  }
  
  deleteActiveItem(): boolean {
    const {
      itemEditing
    } = this;
    
    if (!itemEditing) {
      return false;
    }
    
    const index = this.markingItems.findIndex(v => v === itemEditing);
    
    if (index < 0) {
      return false;
    }
    
    this.markingItems.splice(index, 1);
    this.updateAndDraw(EMarkingStatsChangeCause.DELETE);
    
    const statsList = this.getAllStats();
    
    this.options.onDelete?.(itemEditing.stats, statsList);
    this.emit('delete', itemEditing.stats, statsList);
    
    return true;
  }
  
  deleteAllItems(): void {
    this.markingItems.length = 0;
    this.itemCreating = null;
    this.updateAndDraw(EMarkingStatsChangeCause.CLEAR);
  }
  
  zoom(how: EZoomHow, wheel?: boolean): void {
    switch (how) {
    case EZoomHow.IN:
      this.zoomBy(true, wheel);
      
      break;
    case EZoomHow.OUT:
      this.zoomBy(false, wheel);
      
      break;
    case EZoomHow.MIN:
      this.zoomMin();
      
      break;
    case EZoomHow.MAX:
      this.zoomMax();
      
      break;
    case EZoomHow.RESET:
      this.zoomReset();
      
      break;
    default:
      break;
    }
  }
  
  moveReady(): void {
    const {
      moving,
      itemCreating,
      itemHovering,
      itemHighlighting,
      itemEditing
    } = this;
    
    if (moving || itemCreating || itemEditing?.stats.dragging) { // 不重复触发，且正在新建或拖拽编辑时不触发
      return;
    }
    
    // 一些副作用
    itemHovering?.toggleHovering(false);
    itemHighlighting?.toggleHighlighting(false);
    
    if (itemEditing && !itemEditing.stats.dirty) {
      this.finishEditing(true);
    }
    
    this.moving = true;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_READY);
  }
  
  moveStart(): void {
    if (!this.moving) {
      return;
    }
    
    this.movingCoordsStart = this.mouseInStage;
    this.movingCoordsSnapshot = this.movingCoords;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_START);
    
    this.options.onMoveStart?.();
    this.emit('move-start');
  }
  
  moveProcess(): void {
    const {
      mouseInStage,
      movingCoordsStart,
      movingCoordsSnapshot
    } = this;
    
    if (!movingCoordsStart || !mouseInStage) {
      return;
    }
    
    this.moveTo([movingCoordsSnapshot[0] + mouseInStage[0] - movingCoordsStart[0], movingCoordsSnapshot[1] + mouseInStage[1] - movingCoordsStart[1]]);
  }
  
  movePause(): void {
    if (!this.moving) {
      return;
    }
    
    this.movingCoordsStart = null;
    this.options.onMovePause?.();
    this.emit('move-pause');
  }
  
  moveEnd(): void {
    if (!this.moving) {
      return;
    }
    
    this.moving = false;
    this.movingCoordsStart = null;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_END);
    this.options.onMoveEnd?.();
    this.emit('move-end');
  }
  
  moveTo(coords: Point): void {
    this.movingCoords = coords;
    
    const transform = `translate(${coords[0]}px, ${coords[1]}px)`; // 用 translate 对鼠标位置不会有影响，也不需要重渲染
    
    this.imageBg.style.transform = transform;
    this.canvas.style.transform = transform;
  }
  
  moveBy(dx: number, dy: number): void {
    this.moveTo([this.movingCoords[0] + dx, this.movingCoords[1] + dy]);
  }
  
  selectItem(finder: TMarkingItemFinder<T>): void {
    this.itemHighlighting?.toggleHighlighting(false);
    
    const markingItem = finder === null ? null : this.findItem(finder, this.itemEditing);
    
    this.select(markingItem || null);
    this.updateAndDraw(EMarkingStatsChangeCause.SELECT);
  }
  
  highlightItem(finder: TMarkingItemFinder<T>, borderIndex: number | null = null): void {
    const markingItem = finder === null ? null : this.findItem(finder, this.itemHighlighting || this.itemEditing);
    
    this.markingItems.forEach(v => {
      v.toggleHighlighting(v === markingItem, borderIndex);
    });
    this.updateAndDraw(EMarkingStatsChangeCause.HIGHLIGHT);
  }
  
  getStats(): IMarkingStageStats<T> {
    const {
      stage,
      canvas,
      imageUrl,
      imageLoading,
      imageLoader,
      itemCreating,
      itemHovering,
      itemHighlighting,
      itemEditing
    } = this;
    const rectStage = stage.getBoundingClientRect();
    const rectCanvas = canvas.getBoundingClientRect();
    const itemStatsCreating = itemCreating?.stats || null;
    const itemStatsHovering = itemHovering?.stats || null;
    const itemStatsHighlighting = itemHighlighting?.stats || null;
    const itemStatsEditing = itemEditing?.stats || null;
    
    return {
      disabled: this.disabled,
      // 大小
      zoom: this.zoomLevel,
      stageSize: roundSize([rectStage.width, rectStage.height]), // 浏览器缩放会影响
      canvasSize: roundSize([rectCanvas.width, rectCanvas.height]),
      canvasCoords: roundCoords([rectCanvas.left - rectStage.left, rectCanvas.top - rectStage.top]),
      imageStatus: ((): EImageStatus => {
        if (!imageUrl) {
          return EImageStatus.NONE;
        }
        
        if (imageLoading) {
          return EImageStatus.LOADING;
        }
        
        return imageLoader ? EImageStatus.LOADED : EImageStatus.ERROR;
      })(),
      imageSize: imageLoader ? [imageLoader.naturalWidth, imageLoader.naturalHeight] : [0, 0],
      imageScale: this.imageScale,
      imageMouse: _cloneDeep(this.imageMouse), // 避免使用 immer 对其锁定造成新建后拖拽报错
      imageMouseJustified: this.justified,
      // 鼠标
      mouseInStage: this.mouseInStage,
      mouseInCanvas: this.mouseInCanvas,
      mouseDownCanvas: this.mouseDownCanvas,
      mouseDownMoving: this.mouseDownMoving,
      // 移动状态
      moving: this.moving,
      movingCoordsStart: this.movingCoordsStart,
      movingCoords: this.movingCoords,
      // 与 MarkingItem 有关状态
      itemStatsList: this.getAllStats(),
      itemStatsCreating,
      itemStatsHovering,
      itemStatsHighlighting,
      itemStatsEditing,
      // 根据 MarkingItemStats 计算得出的结果
      creating: !!itemCreating,
      creatingStarted: itemStatsCreating ? itemStatsCreating.path.length > 0 : false,
      creatingCrossing: !!itemStatsCreating?.crossing,
      creatingWillFinish: itemStatsCreating ? itemStatsCreating.creatingWillFinish : false,
      hovering: !!itemStatsHovering,
      hoveringPoint: itemStatsHovering?.path[itemStatsHovering.hoveringPointIndex] || null,
      hoveringPointIndex: itemStatsHovering?.hoveringPointIndex ?? -1,
      hoveringInsertionPointIndex: itemStatsHovering?.hoveringInsertionPointIndex ?? -1,
      hoveringBorderIndex: itemStatsHovering?.hoveringBorderIndex ?? -1,
      highlighting: !!itemStatsHighlighting,
      editing: !!itemStatsEditing,
      editingDirty: itemStatsEditing ? itemStatsEditing.dirty : false,
      editingCrossing: itemStatsEditing ? itemStatsEditing.crossing : false,
      editingHovering: itemStatsEditing ? itemStatsEditing.hovering : false,
      editingHoveringPointIndex: itemStatsEditing ? itemStatsEditing.draggingPointIndex >= 0 ? itemStatsEditing.draggingPointIndex : itemStatsEditing.hoveringPointIndex : -1,
      editingHoveringInsertionPointIndex: itemStatsEditing ? itemStatsEditing.hoveringInsertionPointIndex : -1,
      editingHoveringBorderIndex: itemStatsEditing ? itemStatsEditing.hoveringBorderIndex : -1, // TODO check -1
      editingDragging: itemStatsEditing ? itemStatsEditing.dragging : false,
      editingDraggingPointIndex: itemStatsEditing ? itemStatsEditing.draggingPointIndex : -1,
      editingDraggingInsertionPointIndex: itemStatsEditing ? itemStatsEditing.draggingInsertionPointIndex : -1
    };
  }
  
  draw(drawExtra?: (canvasContext: CanvasRenderingContext2D, scale: number) => void): void {
    const {
      canvas: {
        width,
        height
      },
      canvasContext,
      pixelRatio,
      imageScale,
      statsSnapshot
    } = this;
    
    if (statsSnapshot.imageStatus === 'loading') {
      return;
    }
    
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.scale(imageScale * pixelRatio, imageScale * pixelRatio);
    
    this.drawItems();
    this.drawPerpendicularMark();
    this.drawAuxiliaryLines();
    
    if (drawExtra) {
      canvasContext.save();
      drawExtra(canvasContext, imageScale);
      canvasContext.restore();
    }
    
    canvasContext.setTransform(1, 0, 0, 1, 0, 0); // 清除，必须清除，否则 scale 效果会叠加
  }
  
  destroy(): void {
    this.plugins.forEach(v => v.cleanup?.call(this));
    this.plugins = [];
    this.cleanups.forEach(v => v());
    this.cleanups = [];
    
    try {
      this.container.removeChild(this.stage);
    } catch (_err) {
      // Uncaught DOMException: Node.removeChild: The node to be removed is not a child of this node
    }
  }
}
