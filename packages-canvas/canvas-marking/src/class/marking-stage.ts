import {
  clamp as _clamp,
  merge as _merge
} from 'lodash-es';

import {
  Point,
  Path,
  roundCoords,
  getSnappingPoint,
  getMagnetPointAlongPath,
  getMagnetPointAlongPaths
} from '@kcuf/geometry-basic';
import {
  pixelRatioGet,
  pixelRatioListen
} from '@kcuf/canvas-helper';

import {
  EMarkingMouseStatus,
  EMarkingStatsChangeCause
} from '../enum';
import {
  TSize,
  TMarkingItemFinder,
  IMarkingConfigItem,
  IMarkingItemClass,
  IMarkingItemConfig,
  IMarkingItemOptions,
  IMarkingItemStats,
  IMarkingPlugin,
  IMarkingPluginZoomOptions,
  IMarkingStageClass,
  IMarkingStageOptions,
  IMarkingStageStats
} from '../types';
import {
  DEFAULT_AUXILIARY_STYLE,
  DEFAULT_MAGNET_RADIUS,
  DEFAULT_MARKING_OPTIONS
} from '../const';
import {
  roundFloat,
  roundSize,
  bindDocumentEvent,
  loadImage,
  createMarkingCanvas,
  createMarkingImageBg,
  createMarkingStage
} from '../util';
import {
  pluginCursor,
  pluginTooltip,
  pluginMagnet,
  pluginSnapping,
  pluginZoom,
  pluginMove,
  pluginStats,
  pluginFps
} from '../plugin';

import MarkingItem from './marking-item';

export default class MarkingStage<T = void> implements IMarkingStageClass<T> {
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
   * 磁吸效果
   *
   * 对新建和编辑有效，将鼠标磁吸到点或边，按住 Alt 键临时取消
   */
  private magnet = true;
  /**
   * Snap 效果
   *
   * 对新建有效（若已磁吸，将不生效），需按住 Shift 键启用
   */
  private snapping = false;
  
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
    const safeOptions = _merge({}, DEFAULT_MARKING_OPTIONS, options);
    
    const stage = createMarkingStage();
    const imageBg = createMarkingImageBg(safeOptions.imageBgc);
    const canvas = createMarkingCanvas();
    
    stage.prepend(imageBg); // 作为其第一个元素，可以不需要设 z-index
    stage.appendChild(canvas);
    container.style.overflow = 'hidden';
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
    this.setupImageAndItems(safeOptions.image, safeOptions.items).then(() => this.updateAndDraw(EMarkingStatsChangeCause.INIT));
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
      } catch (err) {
        this.imageUrl = ''; // 再次设置，可以重新加载
      }
      
      this.setupScaleSizing();
      this.imageLoading = false;
    }
  }
  
  private async setupImageAndItems(imageUrl = '', items: IMarkingConfigItem<T>[] = []): Promise<void> {
    this.markingItems.length = 0;
    
    await this.setupImage(imageUrl); // 保证图片加载完成再渲染 MarkingItem
    
    items.forEach(v => {
      if (v.path?.length) {
        this.markingItems.push(this.createMarkingItem(v));
      }
    });
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
    this.itemCreating?.pushPoint();
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
      
      this.actOnMouseMove();
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_MOVE_STAGE);
  }
  
  private handleMouseEnterCanvas(): void {
    this.refreshMouseCoordsInCanvas();
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_ENTER_CANVAS);
  }
  
  private handleMouseLeaveCanvas(e: MouseEvent): void {
    this.mouseInCanvas = null;
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
      mouseInStage,
      mouseInCanvas,
      mouseDownMoving
    } = this;
    
    this.mouseDownCanvas = false;
    this.mouseDownMoving = false;
    
    if (mouseInCanvas) {
      this.creatingPushPoint();
    }
    
    if (this.moving) {
      return;
    }
    
    this.itemEditing?.finishDragging();
    
    if (!mouseInStage || mouseDownMoving) {
      this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_UP_WINDOW);
      
      return;
    }
    
    const doubleClicking = this.isDoubleClicking();
    
    this.mouseClickTime = doubleClicking ? 0 : Date.now();
    
    if (doubleClicking) {
      this.actOnMouseDoubleClick();
    } else {
      this.actOnMouseSingleClick();
    }
    
    this.updateAndDraw(doubleClicking ? EMarkingStatsChangeCause.MOUSE_DOUBLE_CLICK_CANVAS : EMarkingStatsChangeCause.MOUSE_CLICK_CANVAS);
  }
  
  private handleKeyDownWindow(e: KeyboardEvent): void {
    if (!this.mouseInStage || this.moving || e.repeat) {
      return;
    }
    
    this.actOnKeyDown(e);
  }
  
  private actOnMouseMove(): void {
    const {
      moving,
      itemCreating,
      itemEditing
    } = this;
    
    if (moving || itemCreating || !itemEditing) {
      return;
    }
    
    itemEditing.processDragging();
  }
  
  private actOnKeyDown(e: KeyboardEvent): void {
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
          if (itemCreating.removePoint()) {
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
          itemEditing.finishEditing();
          this.updateAndDraw(EMarkingStatsChangeCause.KEYBOARD_FINISH_EDITING);
          
          break;
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          
          itemEditing.finishEditing(true);
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
  
  private actOnMouseSingleClick(): void {
    const {
      options,
      itemCreating,
      itemUnderMouse,
      itemHighlighting
    } = this;
    
    itemHighlighting?.toggleHighlighting(false);
    
    if (itemUnderMouse) {
      options.onMarkingSelect?.(itemUnderMouse.stats, this.getItemStatsList());
    }
    
    if (!itemCreating && itemUnderMouse && options.selectClickMode === 'single') {
      this.select(itemUnderMouse);
    }
  }
  
  private actOnMouseDoubleClick(): void {
    const {
      options,
      itemCreating,
      itemEditing,
      itemUnderMouse
    } = this;
    
    if (itemCreating) { // 新建中，结束新建（可能取消或完成）
      this.finishCreating();
      
      return;
    }
    
    if (itemUnderMouse) {
      options.onMarkingDoubleClick?.(itemUnderMouse.stats, this.getItemStatsList());
    }
    
    if (itemEditing) {
      switch (itemEditing.checkMouse()) {
        case EMarkingMouseStatus.OUT:
          this.select(null);
          
          break; // 点击外部需要继续，不能 return，而是 break
        case EMarkingMouseStatus.IN_POINT:
          itemEditing.removePoint();
          
          return;
        case EMarkingMouseStatus.IN_POINT_INSERTION: // 点中点不做任何事情
          return;
        default:
          this.select(null);
          
          return;
      }
    }
    
    // 双击激活标注对象（一定不是之前的那个）
    if (options.selectClickMode !== 'single') {
      this.select(itemUnderMouse);
    }
  }
  
  /**
   * 每次 render 之前，需更新所有 MarkingItem 的状态，以及本身的状态
   */
  private updateStats(cause: EMarkingStatsChangeCause): void {
    const {
      options: {
        onStatsChange
      },
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
    onStatsChange?.(this.statsSnapshot, cause);
  }
  
  /**
   * 更新 stats 并渲染
   */
  private updateAndDraw(cause: EMarkingStatsChangeCause): void {
    this.updateStats(cause);
    this.draw();
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
    
    this.mouseInCanvas = mouseInCanvas;
    
    const {
      itemCreating,
      itemEditing,
      moving
    } = this;
    
    this.updateImageMouse(mouseInCanvas);
    
    if (!mouseInCanvas || moving || itemCreating || itemEditing?.stats.dragging) {
      this.hoverMarkingItem(null);
    } else {
      this.hoverMarkingItem(this.itemUnderMouse);
    }
  }
  
  /**
   * 根据图片大小、缩放、是否磁吸，换算出鼠标所指像素位置相对于图片的 100% 坐标
   */
  private updateImageMouse(mouseInCanvas: Point | null): void {
    const {
      options: {
        magnetRadius: magnetRadius0 = DEFAULT_MAGNET_RADIUS
      },
      imageScale,
      itemCreating,
      itemEditing
    } = this;
    
    if (!mouseInCanvas) {
      return;
    }
    
    const coords: Point = this.roundClampCoordsInImage([mouseInCanvas[0] / imageScale, mouseInCanvas[1] / imageScale]);
    
    const creatingPath = itemCreating?.stats.path;
    const magnetRadius = magnetRadius0 / imageScale; // 将屏幕像素转化成 canvas 内的像素，以保证磁吸距离和肉眼看到的一致
    let magnetResult: Point | null = null;
    
    // 磁吸
    if (this.magnet && magnetRadius > 0 && (itemCreating || (itemEditing && itemEditing.stats.draggingPoint >= 0))) {
      // 先从非编辑图形中找磁吸点
      magnetResult = getMagnetPointAlongPaths(coords, this.getItemStatsList(itemCreating || itemEditing).map(v => v.path), magnetRadius);
      
      // 没有找到，从正在新建的图形中找（这里有个美好的副作用，就是点可以在两边的点连线上磁吸）
      if (!magnetResult && creatingPath) {
        magnetResult = getMagnetPointAlongPath(coords, creatingPath, magnetRadius);
      }
      
      // 没有找到，从正在编辑的图形中找（这里有个美好的副作用，就是点可以在两边的点连线上磁吸）
      if (!magnetResult && itemEditing) {
        magnetResult = getMagnetPointAlongPath(coords, itemEditing.stats.path.filter((_v, i) => i !== itemEditing.stats.draggingPoint), magnetRadius);
      }
    }
    
    if (this.snapping && !magnetResult && creatingPath?.length) {
      magnetResult = getSnappingPoint(creatingPath[creatingPath.length - 1]!, coords); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
    
    this.imageMouse = this.roundClampCoordsInImage(magnetResult || coords);
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
  
  private draw(): void {
    const {
      canvas: {
        width,
        height
      },
      canvasContext,
      pixelRatio,
      imageScale
    } = this;
    
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.scale(imageScale * pixelRatio, imageScale * pixelRatio);
    
    this.drawAuxiliaryLines();
    this.drawItems();
    
    canvasContext.setTransform(1, 0, 0, 1, 0, 0); // 清除，必须清除，否则 scale 效果会叠加
  }
  
  private drawAuxiliaryLines(): void {
    const {
      options,
      canvasContext,
      itemCreating,
      itemEditing,
      imageScale,
      imageSize,
      imageMouse
    } = this;
    let activePath: Path | undefined;
    
    if (itemCreating) {
      activePath = [...itemCreating.stats.path, imageMouse];
    } else if (itemEditing) {
      activePath = itemEditing.stats.path;
    }
    
    if (!activePath) {
      return;
    }
    
    const paths = this.markingItems.filter(v => v !== itemEditing).map(v => v.stats.path);
    const auxiliaryLine = {
      ...DEFAULT_AUXILIARY_STYLE,
      ...options.auxiliaryLine
    };
    
    const xList = new Set<number>();
    const yList = new Set<number>();
    const xListOverlap = new Set<number>();
    const yListOverlap = new Set<number>();
    const xListNear = new Set<number>();
    const yListNear = new Set<number>();
    
    paths.forEach(path => {
      path.forEach(([x, y]) => {
        xList.add(x);
        yList.add(y);
      });
    });
    
    activePath.forEach(([x, y]) => {
      xList.forEach(v => {
        const distance = Math.abs(v - x) / imageScale;
        
        if (distance < 1) {
          xListOverlap.add(v);
        }
        
        if (distance <= auxiliaryLine.distance && !xListOverlap.has(v)) {
          xListNear.add(v);
        }
      });
      
      yList.forEach(v => {
        const distance = Math.abs(v - y) / imageScale;
        
        if (distance < 1) {
          yListOverlap.add(v);
        }
        
        if (distance <= auxiliaryLine.distance && !yListOverlap.has(v)) {
          yListNear.add(v);
        }
      });
    });
    
    canvasContext.save();
    canvasContext.strokeStyle = auxiliaryLine.color;
    canvasContext.lineWidth = auxiliaryLine.width / imageScale;
    canvasContext.setLineDash(auxiliaryLine.dash.map(v => v / imageScale));
    
    function drawLines(values: Set<number>, alongX: boolean): void {
      values.forEach(v => {
        canvasContext.beginPath();
        
        if (alongX) {
          canvasContext.moveTo(v, 0);
          canvasContext.lineTo(v, imageSize[1]);
        } else {
          canvasContext.moveTo(0, v);
          canvasContext.lineTo(imageSize[0], v);
        }
        
        canvasContext.closePath();
        canvasContext.stroke();
      });
    }
    
    drawLines(xListOverlap, true);
    drawLines(yListOverlap, false);
    
    canvasContext.strokeStyle = auxiliaryLine.colorNear;
    
    drawLines(xListNear, true);
    drawLines(yListNear, false);
    
    canvasContext.restore();
  }
  
  private drawItems(): void {
    const {
      options: {
        inactiveFaded = true
      },
      itemCreating,
      itemHovering,
      itemHighlighting,
      itemEditing,
      mouseInStage
    } = this;
    
    function isFaded(o: IMarkingItemClass<T>): boolean {
      if (!inactiveFaded || o === itemHighlighting || o === itemHovering || o === itemEditing) {
        return false;
      }
      
      return !!itemHighlighting;
    }
    
    this.getMarkingItemsOrdered().forEach(v => v.draw(isFaded(v)));
    
    if (itemCreating && (mouseInStage || itemCreating.stats.path.length)) {
      itemCreating.draw();
    }
  }
  
  private findItemToHighlight(finder: TMarkingItemFinder<T>): IMarkingItemClass<T> | undefined {
    const {
      markingItems,
      itemHighlighting,
      itemEditing
    } = this;
    
    if (typeof finder === 'number') {
      if (finder === 0) {
        return markingItems[0];
      }
      
      let nextIndex = markingItems.findIndex(v => v === (itemHighlighting || itemEditing)) + finder;
      
      // 使其循环能够循环，比如用于 Tab 事件
      if (nextIndex > markingItems.length - 1) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = markingItems.length - 1;
      }
      
      return markingItems[nextIndex];
    }
    
    return markingItems.find(v => v.stats.data && finder(v.stats.data));
  }
  
  private select(markingItem: IMarkingItemClass<T> | null): void {
    const {
      disabled,
      itemEditing
    } = this;
    
    if (disabled || markingItem === itemEditing) {
      return;
    }
    
    itemEditing?.finishEditing();
    markingItem?.select();
  }
  
  private zoom(inOut: boolean, wheel?: boolean): void {
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
    let zoomLevelNext = zoomLevel + delta;
    
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
    
    // TODO 要做这个事情
    // // 根据缩放前后鼠标在 canvas 上的相对位置变化（后 - 前）
    // const [x, y] = this.mouseInCanvas;
    // const dx = x - x0;
    // const dy = y - y0;
    //
    // this.moveBy(dx / 2, dy / 2);
  }
  
  setData(imageUrl?: string, markings: IMarkingConfigItem<T>[] = []): void {
    this.setupImageAndItems(imageUrl, markings).then(() => this.updateAndDraw(EMarkingStatsChangeCause.SET_DATA));
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
  
  toggleMagnet(magnet = true): void {
    if (this.magnet === magnet) {
      return;
    }
    
    this.magnet = magnet;
    this.updateAndDraw(magnet ? EMarkingStatsChangeCause.TOGGLE_MAGNET_TRUE : EMarkingStatsChangeCause.TOGGLE_MAGNET_FALSE);
  }
  
  toggleSnapping(snapping = true): void {
    if (this.snapping === snapping) {
      return;
    }
    
    this.snapping = snapping;
    this.updateAndDraw(snapping ? EMarkingStatsChangeCause.TOGGLE_SNAPPING_TRUE : EMarkingStatsChangeCause.TOGGLE_SNAPPING_FALSE);
  }
  
  startCreating(extraOptions?: IMarkingItemConfig): void {
    const {
      disabled,
      itemCreating
    } = this;
    
    if (disabled || itemCreating) {
      return;
    }
    
    this.moveEnd(); // 副作用 1
    this.itemEditing?.finishEditing(); // 副作用 2
    this.hoverMarkingItem(null);
    
    const markingItem = this.createMarkingItem({
      ...extraOptions,
      onCreate: stats => {
        this.markingItems.push(markingItem);
        this.itemCreating = null;
        this.updateAndDraw(EMarkingStatsChangeCause.FINISH_CREATING);
        this.options.onMarkingCreateComplete?.(stats, this.getItemStatsList());
      }
    });
    
    this.itemCreating = markingItem;
    this.updateAndDraw(EMarkingStatsChangeCause.START_CREATING);
    
    this.options.onMarkingCreateStart?.();
  }
  
  finishCreating(): void {
    this.itemCreating?.finishCreating();
  }
  
  cancelCreating(): void {
    if (this.itemCreating) {
      this.itemCreating = null;
      this.updateAndDraw(EMarkingStatsChangeCause.CANCEL_CREATING);
      this.options.onMarkingCreateCancel?.();
    }
  }
  
  finishEditing(): void {
    this.itemEditing?.finishEditing();
  }
  
  deleteActiveItem(): boolean {
    const {
      options,
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
    options.onMarkingDelete?.(itemEditing.stats, this.getItemStatsList());
    
    return true;
  }
  
  deleteAllItems(): void {
    this.markingItems.length = 0;
    this.itemCreating = null;
    this.updateAndDraw(EMarkingStatsChangeCause.CLEAR);
  }
  
  zoomIn(wheel?: boolean): void {
    this.zoom(true, wheel);
  }
  
  zoomOut(wheel?: boolean): void {
    this.zoom(false, wheel);
  }
  
  zoomMin(): void {
    const {
      pluginZoomOptions
    } = this;
    
    if (pluginZoomOptions) {
      this.zoomTo(pluginZoomOptions.min, EMarkingStatsChangeCause.ZOOM_MIN);
    }
  }
  
  zoomMax(): void {
    const {
      pluginZoomOptions
    } = this;
    
    if (pluginZoomOptions) {
      this.zoomTo(pluginZoomOptions.max, EMarkingStatsChangeCause.ZOOM_MAX);
    }
  }
  
  zoomReset(): void {
    this.moveTo([0, 0]);
    this.setupScaleSizing();
    this.updateAndDraw(EMarkingStatsChangeCause.ZOOM_RESET);
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
      itemEditing.finishEditing(true);
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
  }
  
  moveEnd(): void {
    if (!this.moving) {
      return;
    }
    
    this.moving = false;
    this.movingCoordsStart = null;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_END);
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
  
  highlightItem(finder: TMarkingItemFinder<T> | null, borderIndex: number | null = null): void {
    const markingItem = finder === null ? null : this.findItemToHighlight(finder);
    
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
      stageSize: roundSize([rectStage.width, rectStage.height]), // 浏览器缩放会影响
      canvasSize: roundSize([rectCanvas.width, rectCanvas.height]),
      canvasCoords: roundCoords([rectCanvas.left - rectStage.left, rectCanvas.top - rectStage.top]),
      imageStatus: (() => {
        if (!imageUrl) {
          return 'none';
        }
        
        if (imageLoading) {
          return 'loading';
        }
        
        return imageLoader ? 'loaded' : 'error';
      })(),
      imageSize: imageLoader ? [imageLoader.naturalWidth, imageLoader.naturalHeight] : [0, 0],
      imageScale: this.imageScale,
      imageMouse: this.imageMouse,
      zoom: this.zoomLevel,
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
      itemStatsList: this.getItemStatsList(),
      itemStatsCreating,
      itemStatsHovering,
      itemStatsHighlighting,
      itemStatsEditing,
      // 根据 MarkingItemStats 计算得出的结果
      creating: !!itemCreating,
      creatingStarted: itemStatsCreating ? itemStatsCreating.path.length > 0 : false,
      creatingCrossing: !!itemStatsCreating?.crossing,
      hovering: !!itemStatsHovering,
      hoveringPoint: itemStatsHovering ? itemStatsHovering.hoveringPointIndex : -1,
      hoveringInsertionPoint: itemStatsHovering ? itemStatsHovering.hoveringInsertionPointIndex : -1,
      hoveringBorder: itemStatsHovering ? itemStatsHovering.hoveringBorderIndex : -1,
      highlighting: !!itemHighlighting,
      editing: !!itemStatsEditing,
      editingDirty: itemStatsEditing ? itemStatsEditing.dirty : false,
      editingCrossing: itemStatsEditing ? itemStatsEditing.crossing : false,
      editingHovering: itemStatsEditing ? itemStatsEditing.hovering : false,
      editingHoveringPoint: itemStatsEditing ? itemStatsEditing.draggingPoint >= 0 ? itemStatsEditing.draggingPoint : itemStatsEditing.hoveringPointIndex : -1, // eslint-disable-line no-nested-ternary
      editingHoveringInsertionPoint: itemStatsEditing ? itemStatsEditing.hoveringInsertionPointIndex : -1,
      editingHoveringBorder: itemStatsEditing ? itemStatsEditing.hoveringBorderIndex : -1, // TODO check -1
      editingDragging: itemStatsEditing ? itemStatsEditing.dragging : false,
      editingDraggingPoint: itemStatsEditing ? itemStatsEditing.draggingPoint : -1,
      editingDraggingInsertionPoint: itemStatsEditing ? itemStatsEditing.draggingInsertionPoint : -1
    };
  }
  
  getItemStatsList(exclude?: IMarkingItemClass<T> | null): IMarkingItemStats<T>[] {
    return (exclude ? this.markingItems.filter(v => v !== exclude) : this.markingItems).map(v => v.stats);
  }
  
  destroy(): void {
    this.plugins.forEach(v => v.cleanup?.call(this));
    this.plugins = [];
    this.cleanups.forEach(v => v());
    this.cleanups = [];
    this.container.removeChild(this.stage);
  }
}
