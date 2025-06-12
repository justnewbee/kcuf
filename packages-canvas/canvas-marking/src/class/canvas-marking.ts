import _isEqual from 'lodash/isEqual';
import _merge from 'lodash/merge';
import _clamp from 'lodash/clamp';
import _cloneDeep from 'lodash/cloneDeep';
import _throttle from 'lodash/throttle';

import {
  Angle,
  justifyMagnetAlongPath,
  justifyMagnetAlongPaths,
  JustifyMagnetResult,
  JustifyMagnetType,
  justifyPerpendicularExternal,
  justifyPerpendicularInternal,
  justifySnapAroundPivots,
  Path,
  pathPointSiblingsByIndex,
  pathsAuxiliaryList,
  Point
} from '@kcuf/geometry-basic';
import { bindEventToDocument, getPixelRatio, listenPixelRatioChange } from '@kcuf/mere-dom';
import Subscribable from '@kcuf/subscribable';

import {
  EFinishCreatingReason,
  EImageStatus,
  EMarkingMouseStatus,
  EMarkingStatsChangeCause,
  EMouseJustifyStatus,
  ERelativePosition,
  EZoomHow
} from '../enum';
import {
  ICanvasMarkingClass,
  ICanvasMarkingOptions,
  IImageInfo,
  IMouseInfo,
  IMovingInfo,
  IMarkingConfigItem,
  IMarkingItemClass,
  IMarkingItemConfig,
  IMarkingItemOptions,
  IMarkingItemStats,
  IMarkingPlugin,
  IMarkingStats,
  ISimpleRect,
  IZoomOptions,
  TCanvasMarkingPluginRegister,
  TMarkingItemFinder,
  TSubscribableEvents,
  TZoomArg
} from '../types';
import {
  DEFAULT_AUXILIARY_STYLE,
  DEFAULT_JUSTIFY_MAGNET_RADIUS,
  DEFAULT_JUSTIFY_PERPENDICULAR_THRESHOLD_RADIUS,
  DEFAULT_MARKING_OPTIONS,
  DEFAULT_RIGHT_ANGLE_MARK_SIZE
} from '../const';
import {
  canvasDrawPerpendicularMark,
  createDomCanvas,
  createDomBg,
  createDomStage,
  getImageFitScale,
  getMouseJustifyStatusMagnet,
  getRelativePositionOfArea,
  getRelativePositionOfPoint,
  loadImage,
  myDebug,
  sortMarkingItems
} from '../util';

import CanvasMarkingItem from './canvas-marking-item';

export default class CanvasMarking<T = unknown> extends Subscribable<TSubscribableEvents<T>> implements ICanvasMarkingClass<T> {
  private readonly container: HTMLElement;
  readonly options: ICanvasMarkingOptions<T>;
  readonly stage: HTMLDivElement;
  private bg: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  readonly canvasContext: CanvasRenderingContext2D;
  
  readonly imageInfo: IImageInfo = {
    url: '',
    status: EImageStatus.NONE,
    size: [200, 200],
    scale: 1,
    loader: null
  };
  
  readonly mouseInfo: IMouseInfo = {
    inStage: false,
    downCanvas: false,
    downMoving: false,
    coordsRelativeToStage: [-1, -1],
    coordsRelativeToCanvas: [-1, -1],
    coordsInStage: null,
    coordsInCanvas: null,
    coordsInImage: [-1, -1],
    coordsInImageJustified: EMouseJustifyStatus.NONE
  };
  
  statsSnapshot: IMarkingStats<T>;
  
  private readonly markingItems: IMarkingItemClass<T>[] = [];
  
  private pixelRatio = getPixelRatio();
  
  /**
   * Snap 效果（45° 倍数角方向跳），默认不开启，按住 Shift 键启用
   */
  private snapping = false;
  
  /**
   * 磁吸 + 正交，默认开启，按住 Alt 键临时取消
   */
  private justifying = true;
  
  /**
   * 外部正交时，记录直角的坐标用于画标记
   */
  private justifiedRightAngle: Angle | null = null;
  
  private pluginMap: Map<TCanvasMarkingPluginRegister<T>, IMarkingPlugin<T>> = new Map<TCanvasMarkingPluginRegister<T>, IMarkingPlugin<T>>();
  
  /**
   * 新建中的 MarkingItem，不计入 markingItems，在最末编辑结束后才进入（因此需单独渲染）
   */
  private itemCreating: CanvasMarkingItem<T> | null = null;
  
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
  private lastClickTime = 0;
  
  /**
   * 视图放大缩小系数，每次 zoom 操作将基于 image fit scale * zoomLevel 算出新的 scale
   */
  private zoomLevel = 1;
  
  private readonly movingInfo: IMovingInfo = {
    started: false,
    coordsStart: null,
    coordsSnapshot: [0, 0],
    coords: [0, 0]
  };
  
  /**
   * 用于在销毁实例时清理副作用
   */
  private cleanups: (() => void)[] = [];
  
  private get rectStage(): DOMRect {
    return this.stage.getBoundingClientRect();
  }
  
  private get rectCanvas(): DOMRect {
    return this.canvas.getBoundingClientRect();
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
    // findLast 还比较新，不用
    return this.itemCreating ? null : sortMarkingItems(this.markingItems, true).find(v => v.isUnderMouse()) || null;
  }
  
  private get zoomOptions(): Required<IZoomOptions> {
    return {
      step: 0.25,
      stepWheel: 0.01,
      min: 0.2,
      max: 5,
      ...this.options.zoomOptions
    };
  }
  
  private _handleResize = (): void => {
    this.setupScaleSizing();
    this.updateAndDraw(EMarkingStatsChangeCause.RESIZE);
  };
  
  private _handleMouseEnterStage = (e: MouseEvent): void => {
    this.mouseInfo.inStage = true;
    this.refreshMouseInfo(e);
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_ENTER);
  };
  
  private _handleMouseLeaveStage = (e: MouseEvent): void => {
    this.mouseInfo.inStage = false;
    this.refreshMouseInfo(e);
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_LEAVE);
  };
  
  private _handleMouseMoveGlobal = (e: MouseEvent): void => {
    this.refreshMouseInfo(e);
    this.refreshStats(EMarkingStatsChangeCause.MOUSE_MOVE);
    
    const {
      mouseInfo,
      movingInfo,
      itemCreating,
      itemEditing
    } = this;
    
    if (mouseInfo.coordsInCanvas && mouseInfo.downCanvas) {
      mouseInfo.downMoving = true;
    }
    
    if (!movingInfo.started && !itemCreating && itemEditing) {
      const draggingResult = itemEditing.processDragging();
      
      if (typeof draggingResult === 'number') {
        const statsList = this.getAllStats();
        
        this.options.onPointInsert?.(itemEditing.stats, draggingResult, statsList);
        this.emit('point-insert', itemEditing.stats, draggingResult, statsList);
      }
    }
    
    if (mouseInfo.coordsInStage || itemCreating || itemEditing) {
      this.draw();
    }
    
    if (!mouseInfo.coordsInStage) { // TODO 应该判断移出或临近边缘
      this.moveCanvasWhenMouseOutDragging();
    }
  };
  
  private _handleMouseDownCanvas = (): void => {
    this.mouseInfo.downCanvas = true;
    
    if (this.isDoubleClicking()) {
      return;
    }
    
    if (!this.movingInfo.started) {
      this.itemEditing?.startDragging();
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_DOWN_CANVAS);
  };
  
  private _handleMouseUpGlobal = (): void => {
    const {
      mouseInfo,
      mouseInfo: {
        downMoving
      }
    } = this;
    
    this.creatingPushPoint();
    
    mouseInfo.downCanvas = false;
    mouseInfo.downMoving = false;
    
    if (this.movingInfo.started) {
      return;
    }
    
    this.finishEditDragging();
    
    if (downMoving) {
      this.updateAndDraw(EMarkingStatsChangeCause.MOUSE_UP_WINDOW);
      
      return;
    }
    
    if (!mouseInfo.coordsInStage) {
      return;
    }
    
    const doubleClicking = this.isDoubleClicking();
    
    this.lastClickTime = doubleClicking ? 0 : Date.now();
    
    if (doubleClicking) {
      this.actOnMouseClickDouble();
    } else {
      this.actOnMouseClick();
    }
    
    this.updateAndDraw(doubleClicking ? EMarkingStatsChangeCause.MOUSE_DOUBLE_CLICK_CANVAS : EMarkingStatsChangeCause.MOUSE_CLICK_CANVAS);
  };
  
  private _handleKeyDownGlobal = (e: KeyboardEvent): void => {
    if (!this.mouseInfo.coordsInStage || this.movingInfo.started || e.repeat) {
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
        this.creatingPushPoint(true);
        this.finishCreatingInternal(EFinishCreatingReason.ENTER);
        
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
        this.deleteItemEditing();
        
        break;
      default:
        break;
      }
    }
  };
  
  constructor(container: HTMLElement, options?: ICanvasMarkingOptions<T>) {
    super();
    
    const safeOptions = _merge({}, DEFAULT_MARKING_OPTIONS, options);
    
    /**
     * 主要组成部分
     *
     * ┌- stage ---------------------------┐
     * | ┌- bg --------------------------┐ |
     * | |                               | |
     * | |            canvas             | |
     * | |                               | |
     * | └-------------------------------┘ |
     * └-----------------------------------┘
     */
    const stage = createDomStage();
    const bg = createDomBg(safeOptions.imageBgc);
    const canvas = createDomCanvas();
    
    stage.prepend(bg); // 作为其第一个元素，可以不需要设 z-index
    stage.appendChild(canvas);
    
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.appendChild(stage);
    
    this.container = container;
    this.options = safeOptions;
    this.stage = stage;
    this.bg = bg;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.statsSnapshot = this.getStats();
    
    this.setupEvents();
    this.setupScaleSizing();
    this.setupImageAndMarkings(safeOptions.image, safeOptions.markings, true);
  }
  
  private setupEvents(): void {
    const {
      stage,
      canvas
    } = this;
    const resizeObserver = new ResizeObserver(this._handleResize);
    
    resizeObserver.observe(stage);
    
    stage.addEventListener('mouseenter', this._handleMouseEnterStage);
    stage.addEventListener('mouseleave', this._handleMouseLeaveStage);
    
    canvas.addEventListener('mousedown', this._handleMouseDownCanvas, true);
    
    // 添加消除副作用的清理方法
    this.cleanups.push(bindEventToDocument('mousemove', this._handleMouseMoveGlobal, true));
    this.cleanups.push(bindEventToDocument('mouseup', this._handleMouseUpGlobal, true));
    this.cleanups.push(bindEventToDocument('keydown', this._handleKeyDownGlobal, true));
    this.cleanups.push(() => resizeObserver.disconnect());
    this.cleanups.push(listenPixelRatioChange(pixelRatio => this.updatePixelRatio(pixelRatio)));
  }
  
  private async setupImageAndMarkings(imageUrl = '', markings: IMarkingConfigItem<T>[] = [], init?: boolean): Promise<void> {
    this.markingItems.length = 0;
    
    markings.forEach(v => this.markingItems.push(this.createMarkingItem(v)));
    
    await this.setupImage(imageUrl); // 保证图片加载完成再渲染 MarkingItem
    
    this.updateAndDraw(init ? EMarkingStatsChangeCause.INIT : EMarkingStatsChangeCause.SET_DATA);
  }
  
  /**
   * 根据容器大小、图片本身大小等，计算并设置 canvas 的大小和位置
   */
  private setupScaleSizing(zoomLevel = 1, _aroundMouse?: boolean): void {
    const {
      stage,
      canvas,
      bg,
      imageInfo,
      pixelRatio,
      rectStage
    } = this;
    const imageScale = (imageInfo.loader ? getImageFitScale(stage, imageInfo.loader) : 1) * zoomLevel;
    
    this.zoomLevel = zoomLevel;
    imageInfo.scale = imageScale;
    
    const width = Math.round((imageInfo.loader?.naturalWidth || rectStage.width) * imageScale);
    const height = Math.round((imageInfo.loader?.naturalHeight || rectStage.height) * imageScale);
    const x = Math.round((rectStage.width - width) / 2);
    const y = Math.round((rectStage.height - height) / 2);
    
    // TODO 要做这个事情
    // // 根据缩放前后鼠标在 canvas 上的相对位置变化（后 - 前）
    // const [x, y] = this.mouseInfo.coordsInCanvas;
    // const dx = x - x0;
    // const dy = y - y0;
    //
    // this.moveBy(dx / 2, dy / 2);
    
    // if (aroundMouse && mouseInfo.coordsInStage) {
    //   const dx = rectStage.width / 2 - mouseInfo.coordsInStage[0];
    //   const dy = rectStage.height / 2 - mouseInfo.coordsInStage[1];
    //
    //   x -= dx;
    //   y -= dy;
    // }
    
    bg.style.width = `${width}px`;
    bg.style.height = `${height}px`;
    bg.style.top = `${y}px`;
    bg.style.left = `${x}px`;
    
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.top = `${y}px`;
    canvas.style.left = `${x}px`;
  }
  
  private async setupImage(imageUrl: string): Promise<void> {
    const {
      imageInfo
    } = this;
    
    if (imageUrl === imageInfo.url) { // 避免相同的图片重复加载渲染造成的闪现
      return;
    }
    
    const {
      bg
    } = this;
    
    bg.style.transition = 'none'; // 保证切换图片的时候，新图不产生残影
    bg.style.opacity = '0'; // 若有图，则等加载完再显示
    bg.style.backgroundImage = imageUrl ? `url(${imageUrl})` : 'none';
    
    this.moveTo([0, 0]);
    
    imageInfo.url = imageUrl;
    imageInfo.loader = null;
    imageInfo.status = imageUrl ? EImageStatus.LOADING : EImageStatus.NONE;
    
    this.setupScaleSizing();
    
    if (!imageUrl) {
      return;
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.LOADING_IMAGE);
    this.options.onImageLoadStart?.(imageUrl);
    this.emit('image-load-start', imageUrl);
    
    const start = Date.now();
    
    try {
      const imageLoader = await loadImage(imageUrl);
      const duration = Date.now() - start;
      
      imageInfo.status = EImageStatus.LOADED;
      imageInfo.loader = imageLoader;
      
      bg.style.transition = 'opacity 200ms ease-in-out';
      bg.style.opacity = '1';
      
      this.options.onImageLoadSuccess?.(imageUrl, [imageLoader.naturalWidth, imageLoader.naturalHeight], duration);
      this.emit('image-load-success', imageUrl, [imageLoader.naturalWidth, imageLoader.naturalHeight], duration);
    } catch (_err) {
      const duration = Date.now() - start;
      
      imageInfo.status = EImageStatus.ERROR;
      imageInfo.loader = null;
      imageInfo.url = ''; // 再次设置，可以重新加载
      
      this.options.onImageLoadError?.(imageUrl, duration);
      this.emit('image-load-error', imageUrl, duration);
    }
    
    this.setupScaleSizing();
  }
  
  private refreshMouseInfo(e: MouseEvent): void {
    const {
      mouseInfo,
      rectStage,
      rectCanvas
    } = this;
    
    const coordsRelativeToStage: Point = [e.clientX - rectStage.left, e.clientY - rectStage.top];
    const coordsRelativeToCanvas: Point = [e.clientX - rectCanvas.left, e.clientY - rectCanvas.top];
    const [x, y] = coordsRelativeToStage;
    const canvasX = rectCanvas.left - rectStage.left;
    const canvasY = rectCanvas.top - rectStage.top;
    const inCanvas = x >= Math.max(0, canvasX) && y >= Math.max(0, canvasY) && x <= Math.min(rectStage.width, rectCanvas.width + canvasX) && y <= Math.min(rectStage.height, rectCanvas.height + canvasY);
    
    mouseInfo.coordsRelativeToStage = coordsRelativeToStage;
    mouseInfo.coordsRelativeToCanvas = coordsRelativeToCanvas;
    mouseInfo.coordsInStage = mouseInfo.inStage ? coordsRelativeToStage : null;
    mouseInfo.coordsInCanvas = inCanvas ? [
      _clamp(coordsRelativeToCanvas[0], 0, rectCanvas.width),
      _clamp(coordsRelativeToCanvas[1], 0, rectCanvas.height)
    ] : null;
    
    this.refreshMouseInImage();
  }
  
  /**
   * 根据图片大小、缩放、是否磁吸、是否 Snap，换算出鼠标所指像素位置相对于图片的 100% 坐标
   */
  private refreshMouseInImage(): void {
    this.justifyClear();
    
    const {
      rectStage,
      rectCanvas,
      mouseInfo,
      mouseInfo: {
        coordsRelativeToCanvas
      },
      itemCreating,
      itemEditing
    } = this;
    const mouseIsInCanvas = this.mouseInfo.coordsInCanvas;
    const canvasX = rectCanvas.left - rectStage.left;
    const canvasY = rectCanvas.top - rectStage.top;
    
    this.mouseInfo.coordsInImage = this.clampCoordsInImage(this.fromCanvasCoordsToImageCoords([
      _clamp(coordsRelativeToCanvas[0], canvasX >= 0 ? 0 : Math.abs(canvasX), Math.min(rectCanvas.width, rectStage.width - canvasX)),
      _clamp(coordsRelativeToCanvas[1], canvasY >= 0 ? 0 : Math.abs(canvasY), Math.min(rectCanvas.height, rectStage.height - canvasY))
    ]));
    
    mouseInfo.coordsInImage = this.clampCoordsInImage(this.fromCanvasCoordsToImageCoords([
      _clamp(mouseInfo.coordsRelativeToCanvas[0], canvasX >= 0 ? 0 : Math.abs(canvasX), Math.min(rectCanvas.width, rectStage.width - canvasX)),
      _clamp(mouseInfo.coordsRelativeToCanvas[1], canvasY >= 0 ? 0 : Math.abs(canvasY), Math.min(rectCanvas.height, rectStage.height - canvasY))
    ]));
    
    if (mouseIsInCanvas && (itemCreating || itemEditing)) {
      this.justifyImageMouseMagnet() || this.justifyImageMousePerpendicularInternal() || this.justifyImageMousePerpendicularExternal() || this.justifyImageMouseSnap();
    }
    
    this.hoverMarkingItem(!mouseIsInCanvas || this.movingInfo.started || itemCreating || itemEditing?.stats.dragging ? null : this.itemUnderMouse);
  }
  
  /**
   * 每次 render 之前，需更新所有 `MarkingItem` 的状态，以及本身的状态
   */
  private refreshStats(cause: EMarkingStatsChangeCause): void {
    const {
      imageInfo,
      rectCanvas
    } = this;
    
    imageInfo.size = imageInfo.loader ? [
      imageInfo.loader.naturalWidth,
      imageInfo.loader.naturalHeight
    ] : [
      rectCanvas.width,
      rectCanvas.height
    ];
    
    // 先更新所有 `MarkingItem` 的 `stats`
    this.itemCreating?.refreshStats();
    this.markingItems.forEach(v => {
      v.refreshStats();
    });
    
    const stats = this.getStats();
    
    this.statsSnapshot = stats;
    this.pluginMap.forEach(v => v.run?.call(this, stats, cause)); // 每次状态更新都必须运行 plugin
    
    this.fireStatsChange(stats, cause);
  }
  
  private getOptionJustifyPerpendicularThresholdRadius(): number {
    const {
      options: {
        justifyPerpendicularThresholdRadius = DEFAULT_JUSTIFY_PERPENDICULAR_THRESHOLD_RADIUS
      }
    } = this;
    
    return this.fromCanvasPixelToImagePixel(justifyPerpendicularThresholdRadius);
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
      lastClickTime
    } = this;
    
    return Date.now() - lastClickTime <= doubleClickInterval;
  }
  
  private createMarkingItem(extraOptions?: IMarkingItemOptions<T>, initialPath?: Path): CanvasMarkingItem<T> {
    const {
      options
    } = this;
    
    return new CanvasMarkingItem<T>(this, {
      styleConfig: options.styleConfig,
      pointCountMin: options.pointCountMin,
      pointCountMax: options.pointCountMax,
      pointInsertionMinDistance: options.pointInsertionMinDistance,
      ...extraOptions
    }, initialPath);
  }
  
  private creatingPushPoint(byEnter?: boolean): void {
    const {
      itemCreating
    } = this;
    
    if (!this.mouseInfo.coordsInCanvas || !itemCreating) {
      return;
    }
    
    const result = itemCreating.pushPoint(this.options.onPointPushPre);
    
    if (result !== false) {
      const statsList = this.getAllStats();
      
      this.options.onPointPush?.(itemCreating.stats, statsList);
      this.emit('point-push', itemCreating.stats, statsList);
    }
    
    switch (result) {
    case 'close':
      this.finishCreatingInternal(byEnter ? EFinishCreatingReason.ENTER : EFinishCreatingReason.CLOSE);
      
      break;
    case 'last':
      this.finishCreatingInternal(byEnter ? EFinishCreatingReason.ENTER : EFinishCreatingReason.LAST);
      
      break;
    default:
      break;
    }
  }
  
  private actOnMouseClick(): void {
    const {
      itemUnderMouse
    } = this;
    
    this.itemHighlighting?.toggleHighlighting(false);
    
    const itemStatsUnderMouse = itemUnderMouse?.stats;
    
    if (itemStatsUnderMouse && !itemStatsUnderMouse.noClick) {
      const statsList = this.getAllStats();
      
      this.options.onClick?.(itemStatsUnderMouse, statsList);
      this.emit('click', itemStatsUnderMouse, statsList);
    }
    
    if (!this.itemCreating) {
      this.selectItem(itemUnderMouse);
    }
  }
  
  private actOnMouseClickDouble(): void {
    if (this.itemCreating) { // 新建中，结束新建（可能取消或完成）
      this.finishCreatingInternal(EFinishCreatingReason.DOUBLE_CLICK);
      
      return;
    }
    
    const {
      itemEditing
    } = this;
    
    if (!itemEditing) {
      return;
    }
    
    switch (itemEditing.checkMouse()) {
    case EMarkingMouseStatus.OUT:
      this.selectItem(null);
      
      break;
    case EMarkingMouseStatus.IN_POINT: {
      const pointRemovedIndex = itemEditing.removePoint();
      
      if (pointRemovedIndex >= 0) {
        const statsList = this.getAllStats();
        
        this.options.onPointDelete?.(itemEditing.stats, pointRemovedIndex, statsList);
        this.emit('point-delete', itemEditing.stats, pointRemovedIndex, statsList);
      }
      
      break;
    }
    case EMarkingMouseStatus.IN_POINT_INSERTION: // 点中点不做任何事情
      return;
    default:
      this.selectItem(null);
      
      break;
    }
  }
  
  private fireStatsChange = _throttle((stats: IMarkingStats<T>, cause: EMarkingStatsChangeCause) => {
    this.options.onStatsChange?.(stats, cause);
    this.emit('stats-change', stats, cause);
  }, 1000);
  
  /**
   * 更新 stats 并渲染
   */
  private updateAndDraw(cause: EMarkingStatsChangeCause): void {
    this.refreshStats(cause);
    this.draw();
  }
  
  private clampCoordsInImage([x, y]: Point): Point {
    const {
      imageInfo: {
        size
      }
    } = this;
    
    return [
      _clamp(x, 0, size[0]),
      _clamp(y, 0, size[1])
    ];
  }
  
  /**
   * 图片有缩放，有写场景下我们需要将肉眼看到相对于 canvas 的坐标转换成相对于 image 的坐标
   */
  private fromCanvasPixelToImagePixel(canvasPixel: number): number {
    return canvasPixel / this.imageInfo.scale;
  }
  
  private fromCanvasCoordsToImageCoords(canvasCoords: Point): Point {
    return [canvasCoords[0] / this.imageInfo.scale, canvasCoords[1] / this.imageInfo.scale];
  }
  
  private justifyClear(): void {
    this.mouseInfo.coordsInImageJustified = EMouseJustifyStatus.NONE;
    this.justifiedRightAngle = null;
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
      mouseInfo
    } = this;
    const itemStatsCreating = this.itemCreating?.stats;
    const itemStatsEditing = this.itemEditing?.stats;
    let justifiedResult: JustifyMagnetResult | null = null;
    
    if (itemStatsCreating) { // 新建内部磁吸
      justifiedResult = justifyMagnetAlongPath(mouseInfo.coordsInImage, itemStatsCreating.path, magnetRadius);
    }
    
    if (!justifiedResult && itemStatsEditing && itemStatsEditing?.draggingPointIndex >= 0) { // 编辑内部磁吸
      justifiedResult = justifyMagnetAlongPath(mouseInfo.coordsInImage, itemStatsEditing.path.filter((_v, i) => {
        return i !== itemStatsEditing.draggingPointIndex;
      }), magnetRadius);
    }
    
    // 新建或编辑，外部磁吸
    justifiedResult ||= justifyMagnetAlongPaths(mouseInfo.coordsInImage, this.getAllPaths(true), magnetRadius);
    
    if (justifiedResult) {
      mouseInfo.coordsInImage = this.clampCoordsInImage(justifiedResult.point);
      mouseInfo.coordsInImageJustified = getMouseJustifyStatusMagnet(justifiedResult);
      
      // 磁吸的时候，若不是吸住顶点，还需要进一步做直角矫正
      if (justifiedResult.type !== JustifyMagnetType.VERTEX) {
        this.justifyImageMousePerpendicularExternal();
      }
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
    
    const {
      mouseInfo
    } = this;
    const justifiedResult = pathToJustifyPerpendicular ? justifyPerpendicularInternal(mouseInfo.coordsInImage, pathToJustifyPerpendicular, {
      radius: this.getOptionJustifyPerpendicularThresholdRadius()
    }) : null;
    
    if (justifiedResult) {
      mouseInfo.coordsInImageJustified = EMouseJustifyStatus.PERPENDICULAR_INTERNAL;
      mouseInfo.coordsInImage = this.clampCoordsInImage(justifiedResult.point);
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
    
    const {
      mouseInfo
    } = this;
    const justifiedResult = pivot ? justifyPerpendicularExternal(mouseInfo.coordsInImage, pivot, this.getAllPaths(true), {
      radius: this.getOptionJustifyPerpendicularThresholdRadius()
    }) : null;
    
    if (justifiedResult) {
      this.justifiedRightAngle = justifiedResult.angle;
      
      mouseInfo.coordsInImageJustified = EMouseJustifyStatus.PERPENDICULAR_EXTERNAL;
      mouseInfo.coordsInImage = this.clampCoordsInImage(justifiedResult.point);
    }
    
    return !!justifiedResult;
  }
  
  /**
   * 将当前点自动旋转到 45° 的倍数角度
   */
  private justifyImageMouseSnap(): boolean {
    if (!this.snapping) {
      return false;
    }
    
    const {
      mouseInfo
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
    
    const justifiedResult = justifySnapAroundPivots(mouseInfo.coordsInImage, [pivot1, pivot2]);
    
    if (justifiedResult) {
      mouseInfo.coordsInImageJustified = EMouseJustifyStatus.SNAP;
      mouseInfo.coordsInImage = this.clampCoordsInImage(justifiedResult.point);
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
  
  private moveCanvasWhenMouseOutDragging(): void {
    const {
      statsSnapshot: {
        stageRect: stageRect0,
        canvasRect,
        creatingStarted,
        editingDragging
      }
    } = this;
    
    if (!creatingStarted && !editingDragging) {
      return;
    }
    
    const stageRect: ISimpleRect = {
      coords: [0, 0],
      size: stageRect0.size
    };
    const pointRelative = getRelativePositionOfPoint(stageRect, this.mouseInfo.coordsRelativeToStage);
    
    if (pointRelative === ERelativePosition.C) { // 不可能，为了严谨
      return;
    }
    
    const canvasRelative = getRelativePositionOfArea(stageRect, canvasRect);
    
    if (!canvasRelative.includes(pointRelative)) {
      return;
    }
    
    const UNIT = 5;
    let dx = 0;
    let dy = 0;
    
    if ([ERelativePosition.TL, ERelativePosition.L, ERelativePosition.BL].includes(pointRelative)) {
      dx = UNIT;
    } else if ([ERelativePosition.TR, ERelativePosition.R, ERelativePosition.BR].includes(pointRelative)) {
      dx = -UNIT;
    }
    
    if ([ERelativePosition.TL, ERelativePosition.T, ERelativePosition.TR].includes(pointRelative)) {
      dy = UNIT;
    } else if ([ERelativePosition.BL, ERelativePosition.B, ERelativePosition.BR].includes(pointRelative)) {
      dy = -UNIT;
    }
    
    if (dx || dy) {
      this.moveBy(dx, dy);
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
        perpendicularMarkSize = DEFAULT_RIGHT_ANGLE_MARK_SIZE
      },
      canvasContext,
      imageInfo
    } = this;
    
    canvasDrawPerpendicularMark(canvasContext, justifiedRightAngle, {
      scale: imageInfo.scale,
      size: perpendicularMarkSize,
      color: activeItem.getBorderColor()
    });
  }
  
  private drawAuxiliaryLines(): void {
    const {
      mouseInfo
    } = this;
    
    if (mouseInfo.coordsInImageJustified) { // 正在磁吸不画引导线
      return;
    }
    
    const {
      options,
      canvasContext,
      itemCreating,
      itemEditing
    } = this;
    let activePath: Path | undefined;
    
    if (itemCreating) {
      activePath = [mouseInfo.coordsInImage];
    } else if (itemEditing && itemEditing.stats.draggingMoved) {
      activePath = itemEditing.stats.path;
    }
    
    if (!activePath) {
      return;
    }
    
    const auxiliarySegmentList = pathsAuxiliaryList(this.markingItems.filter(v => v !== itemEditing).map(v => v.stats.path), activePath);
    
    if (!auxiliarySegmentList.length) {
      return;
    }
    
    const auxiliaryOptions = {
      ...DEFAULT_AUXILIARY_STYLE,
      ...options.auxiliaryStyle
    };
    
    canvasContext.save();
    canvasContext.strokeStyle = auxiliaryOptions.color;
    canvasContext.lineWidth = this.fromCanvasPixelToImagePixel(auxiliaryOptions.width);
    
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
      itemCreating,
      itemHighlighting
    } = this;
    
    sortMarkingItems(this.markingItems).forEach(v => v.draw(itemHighlighting ? v !== itemHighlighting : false));
    
    if (itemCreating && (this.mouseInfo.coordsInCanvas || itemCreating.stats.path.length)) {
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
    
    if (typeof finder === 'string') {
      return markingItems.find(v => v.stats.id === finder) || null;
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
    
    return markingItems.find(v => finder(v.stats.id, v.stats.data)) || null;
  }
  
  private selectItem(item: IMarkingItemClass<T> | null): void {
    const {
      itemEditing
    } = this;
    
    if (item === itemEditing || item?.stats.noSelect) {
      return;
    }
    
    this.finishEditing();
    item?.select();
    
    const itemStats = item ? item.stats : null;
    const statsList = this.getAllStats();
    
    this.options.onSelectionChange?.(itemStats, statsList);
    this.emit('selection-change', itemStats, statsList);
  }
  
  private zoomBy(inOut: boolean, aroundMouse?: boolean, wheelDelta?: number): void {
    const {
      step,
      stepWheel,
      min,
      max
    } = this.zoomOptions;
    const delta = (inOut ? 1 : -1) * (wheelDelta ? stepWheel * wheelDelta : step);
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
    
    this.zoomTo(zoomLevelNext, delta > 0 ? EMarkingStatsChangeCause.ZOOM_IN : EMarkingStatsChangeCause.ZOOM_OUT, aroundMouse);
  }
  
  private zoomTo(zoomLevelNext: number, cause: EMarkingStatsChangeCause, aroundMouse?: boolean): void {
    const {
      zoomLevel
    } = this;
    
    if (zoomLevel === zoomLevelNext) {
      return;
    }
    
    this.setupScaleSizing(zoomLevelNext, aroundMouse);
    this.refreshMouseInImage();
    this.updateAndDraw(cause);
    this.throttledFireZoomChange(zoomLevelNext, zoomLevel);
  }
  
  private fireZoomChange(zoomLevelNext: number, zoomLevel: number): void {
    this.options.onZoomChange?.(zoomLevelNext, zoomLevel);
    this.emit('zoom-change', zoomLevelNext, zoomLevel);
  }
  
  /**
   * zoom-change 会频繁触发，压一下
   */
  private throttledFireZoomChange = _throttle((zoomLevelNext: number, zoomLevel: number) => {
    this.fireZoomChange(zoomLevelNext, zoomLevel);
  }, 300);
  
  private zoomMin(): void {
    this.zoomTo(this.zoomOptions.min, EMarkingStatsChangeCause.ZOOM_MIN);
  }
  
  private zoomMax(): void {
    this.zoomTo(this.zoomOptions.max, EMarkingStatsChangeCause.ZOOM_MAX);
  }
  
  private zoomReset(): void {
    this.zoomTo(1, EMarkingStatsChangeCause.ZOOM_RESET);
    this.moveTo([0, 0]);
  }
  
  private finishEditDragging(): void {
    const {
      options: {
        onEditDragEndPre,
        onEditDragEnd
      },
      itemEditing
    } = this;
    
    if (itemEditing?.finishDragging(onEditDragEndPre)) {
      this.justifyClear();
      
      const statsList = this.getAllStats();
      
      onEditDragEnd?.(itemEditing.stats, statsList);
      this.emit('edit-drag-end', itemEditing.stats, statsList);
    }
  }
  
  setData(image?: string, markings: IMarkingConfigItem<T>[] = []): void {
    // 确保只有在变化时（路径或样式）才进行设置，以保证拖拽结束（但编辑未结束）时，不中断编辑
    if (image === this.imageInfo.url && _isEqual(markings.map(v => ({
      id: v.id,
      p: v.path,
      s: v.styleConfig
    })), this.statsSnapshot.itemStatsList.map(v => ({
      id: v.id,
      p: v.path,
      s: v.styleConfig
    })))) {
      return;
    }
    
    const lastSelectedId = this.itemEditing?.stats.id;
    
    this.justifyClear();
    this.setupImageAndMarkings(image, markings).then(() => {
      if (lastSelectedId) {
        this.select(id => id === lastSelectedId);
      }
    });
  }
  
  updateOptions(updates: Partial<ICanvasMarkingOptions<T>>): void {
    const updatedKeys = Object.keys(updates).reduce((result: string[], v) => {
      const key = v as keyof ICanvasMarkingOptions;
      
      if (key !== 'image' && key !== 'markings' && !_isEqual(this.options[key], updates[key])) {
        this.options[key] = updates[key] as never;
        
        result.push(key);
      }
      
      return result;
    }, []);
    
    if (updatedKeys.length) {
      this.updateAndDraw(EMarkingStatsChangeCause.UPDATE_OPTIONS);
    }
  }
  
  registerPlugin(pluginRegister: TCanvasMarkingPluginRegister<T>): () => void {
    const {
      pluginMap
    } = this;
    
    if (!pluginMap.get(pluginRegister)) {
      pluginMap.set(pluginRegister, pluginRegister(this));
    }
    
    return () => {
      const plugin = this.pluginMap.get(pluginRegister);
      
      plugin?.cleanup?.();
      
      this.pluginMap.delete(pluginRegister);
    };
  }
  
  toggleJustify(enabled = true): void {
    if (this.justifying === enabled) {
      return;
    }
    
    this.justifying = enabled;
    this.refreshMouseInImage();
    this.itemEditing?.processDragging(); // 否则不会立即产生效果
    this.updateAndDraw(enabled ? EMarkingStatsChangeCause.TOGGLE_JUSTIFY_TRUE : EMarkingStatsChangeCause.TOGGLE_JUSTIFY_FALSE);
  }
  
  toggleSnap(enabled = true): void {
    if (this.snapping === enabled) {
      return;
    }
    
    this.snapping = enabled;
    this.refreshMouseInImage();
    this.itemEditing?.processDragging(); // 否则不会立即产生效果
    this.updateAndDraw(enabled ? EMarkingStatsChangeCause.TOGGLE_SNAP_TRUE : EMarkingStatsChangeCause.TOGGLE_SNAP_FALSE);
  }
  
  startCreating(config?: IMarkingItemConfig, initialPath?: Path): void {
    this.moveEnd(); // 副作用 - 结束移动
    this.hoverMarkingItem(null); // 副作用 - 取消 hover
    
    if (this.itemEditing) { // 副作用 - 结束编辑
      this.finishEditing();
      
      const statsList = this.getAllStats();
      
      this.options.onSelectionChange?.(null, statsList);
      this.emit('selection-change', null, statsList);
    }
    
    this.itemCreating = this.createMarkingItem(config, initialPath); // 副作用 - 替换正在进行的新建（有的话），而不触发其 `onCreateCancel`
    this.updateAndDraw(EMarkingStatsChangeCause.START_CREATING);
    this.options.onCreateStart?.();
    this.emit('create-start');
  }
  
  cancelCreating(): void {
    if (!this.itemCreating) {
      return;
    }
    
    this.justifyClear();
    this.itemCreating = null;
    this.updateAndDraw(EMarkingStatsChangeCause.CANCEL_CREATING);
    this.options.onCreateCancel?.();
    this.emit('create-cancel');
  }
  
  finishCreating(): void {
    this.finishCreatingInternal();
  }
  
  private finishCreatingInternal(reason?: EFinishCreatingReason): void {
    const {
      options: {
        onCreateCompletePre,
        onCreateComplete,
        onCreateCancel
      },
      itemCreating
    } = this;
    
    if (!itemCreating) {
      return;
    }
    
    const completeResult = itemCreating.finishCreating(onCreateCompletePre);
    
    if (!completeResult) { // 不符合完成新建的标准
      return;
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.FINISH_CREATING_WAIT);
    
    completeResult.then(finalResult => {
      this.justifyClear();
      this.itemCreating = null;
      
      if (finalResult) {
        this.markingItems.push(itemCreating);
        
        const statsList = this.getAllStats();
        
        this.updateAndDraw(EMarkingStatsChangeCause.FINISH_CREATING);
        
        onCreateComplete?.(itemCreating.stats, statsList, reason);
        this.emit('create-complete', itemCreating.stats, statsList, reason);
      } else { // 相当于取消
        this.updateAndDraw(EMarkingStatsChangeCause.CANCEL_CREATING);
        
        onCreateCancel?.();
        this.emit('create-cancel');
      }
    });
  }
  
  finishEditing(cancel?: boolean): void {
    const {
      itemEditing
    } = this;
    
    if (!itemEditing) {
      return;
    }
    
    this.finishEditDragging();
    
    if (itemEditing.finishEditing(cancel)) {
      this.justifyClear();
      
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
  
  deleteItemEditing(): boolean {
    const {
      itemEditing
    } = this;
    const stats = itemEditing?.stats;
    
    if (!stats || stats.noDelete) {
      return false;
    }
    
    const index = this.markingItems.findIndex(v => v === itemEditing);
    
    if (index < 0) {
      return false;
    }
    
    this.markingItems.splice(index, 1);
    this.updateAndDraw(EMarkingStatsChangeCause.DELETE);
    
    const statsList = this.getAllStats();
    
    this.options.onDelete?.(stats, statsList);
    this.emit('delete', stats, statsList);
    
    return true;
  }
  
  deleteItemsAll(): void {
    this.markingItems.length = 0;
    this.itemCreating = null;
    this.updateAndDraw(EMarkingStatsChangeCause.CLEAR);
  }
  
  zoom(how: TZoomArg, aroundMouse?: boolean, wheelDelta?: number): void {
    switch (how) {
    case EZoomHow.IN:
      this.zoomBy(true, aroundMouse, wheelDelta);
      
      break;
    case EZoomHow.OUT:
      this.zoomBy(false, aroundMouse, wheelDelta);
      
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
  
  toggleMove(): void {
    if (this.movingInfo.started) {
      this.moveEnd();
    } else {
      this.moveReady();
    }
  }
  
  moveReady(): void {
    const {
      movingInfo,
      itemCreating,
      itemHovering,
      itemHighlighting,
      itemEditing
    } = this;
    
    if (movingInfo.started || itemCreating || itemEditing?.stats.dragging) { // 不重复触发，且正在新建或拖拽编辑时不触发
      return;
    }
    
    // 一些副作用
    itemHovering?.toggleHovering(false);
    itemHighlighting?.toggleHighlighting(false);
    
    if (itemEditing && !itemEditing.stats.dirty) {
      this.finishEditing(true);
    }
    
    movingInfo.started = true;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_READY);
    
    this.options.onMoveReady?.();
    this.emit('move-ready');
  }
  
  moveStart(): void {
    const {
      mouseInfo,
      movingInfo
    } = this;
    
    if (!movingInfo.started) {
      return;
    }
    
    movingInfo.coordsStart = mouseInfo.coordsInStage;
    movingInfo.coordsSnapshot = movingInfo.coords;
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_START);
    
    this.options.onMoveStart?.();
    this.emit('move-start');
  }
  
  moveProcess(): void {
    const {
      mouseInfo: {
        coordsInStage
      },
      movingInfo
    } = this;
    
    if (!movingInfo.coordsStart || !coordsInStage) {
      return;
    }
    
    this.moveTo([movingInfo.coordsSnapshot[0] + coordsInStage[0] - movingInfo.coordsStart[0], movingInfo.coordsSnapshot[1] + coordsInStage[1] - movingInfo.coordsStart[1]]);
  }
  
  movePause(): void {
    const {
      movingInfo
    } = this;
    
    if (!movingInfo.started) {
      return;
    }
    
    movingInfo.coordsStart = null;
    
    this.options.onMovePause?.();
    this.emit('move-pause');
  }
  
  moveEnd(): void {
    const {
      movingInfo
    } = this;
    
    if (!movingInfo.started) {
      return;
    }
    
    movingInfo.started = false;
    movingInfo.coordsStart = null;
    
    this.updateAndDraw(EMarkingStatsChangeCause.MOVE_END);
    this.options.onMoveEnd?.();
    this.emit('move-end');
  }
  
  moveTo(coords: Point): void {
    this.movingInfo.coords = coords;
    
    const transform = `translate(${coords[0]}px, ${coords[1]}px)`; // 用 translate 对鼠标位置不会有影响，也不需要重渲染
    
    this.bg.style.transform = transform;
    this.canvas.style.transform = transform;
  }
  
  moveBy(dx: number, dy: number): void {
    this.moveTo([this.movingInfo.coords[0] + dx, this.movingInfo.coords[1] + dy]);
  }
  
  select(finder: TMarkingItemFinder<T>, highlightToo?: boolean): void {
    const markingItem = finder === null ? null : this.findItem(finder, this.itemEditing);
    
    this.itemHighlighting?.toggleHighlighting(false);
    this.selectItem(markingItem || null);
    
    if (markingItem && highlightToo) {
      markingItem.toggleHighlighting();
    }
    
    this.updateAndDraw(EMarkingStatsChangeCause.SELECT);
  }
  
  highlight(finder: TMarkingItemFinder<T>, borderIndex: number | null = null): void {
    const markingItem = finder === null ? null : this.findItem(finder, this.itemHighlighting || this.itemEditing);
    
    this.markingItems.forEach(v => v.toggleHighlighting(v === markingItem, borderIndex));
    this.updateAndDraw(EMarkingStatsChangeCause.HIGHLIGHT);
  }
  
  draw(drawExtra?: (canvasContext: CanvasRenderingContext2D, scale: number) => void): void {
    const {
      canvas: {
        width,
        height
      },
      canvasContext,
      imageInfo,
      pixelRatio
    } = this;
    
    if (imageInfo.status === EImageStatus.LOADING) {
      return;
    }
    
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.scale(imageInfo.scale * pixelRatio, imageInfo.scale * pixelRatio);
    
    this.drawItems();
    this.drawPerpendicularMark();
    this.drawAuxiliaryLines();
    
    if (drawExtra) {
      canvasContext.save();
      drawExtra(canvasContext, imageInfo.scale);
      canvasContext.restore();
    }
    
    canvasContext.setTransform(1, 0, 0, 1, 0, 0); // 清除，必须清除，否则 scale 效果会叠加
  }
  
  /**
   * @implements Subscribable beforeEmit
   */
  beforeEmit(topic: keyof TSubscribableEvents, args: unknown[]): void {
    if (this.options.debugEvents && topic !== 'stats-change') {
      myDebug(topic, args);
    }
  }
  
  destroy(): void {
    this.pluginMap.forEach(v => {
      v.cleanup?.();
    });
    this.pluginMap.clear();
    
    this.cleanups.forEach(v => v());
    this.cleanups = [];
    
    try {
      this.container.removeChild(this.stage);
    } catch (_err) {
      // Uncaught DOMException: Node.removeChild: The node to be removed is not a child of this node
    }
  }
  
  getStats(): IMarkingStats<T> {
    const {
      rectStage,
      rectCanvas
    } = this;
    const itemStatsCreating = this.itemCreating?.stats || null;
    const itemStatsHovering = this.itemHovering?.stats || null;
    const itemStatsHighlighting = this.itemHighlighting?.stats || null;
    const itemStatsSelected = this.itemEditing?.stats || null;
    
    return {
      zoom: this.zoomLevel,
      stageRect: {
        coords: [rectStage.left, rectStage.top],
        size: [rectStage.width, rectStage.height]
      },
      canvasRect: {
        coords: [rectCanvas.left - rectStage.left, rectCanvas.top - rectStage.top],
        size: [rectCanvas.width, rectCanvas.height]
      },
      imageInfo: _cloneDeep(this.imageInfo),
      mouseInfo: _cloneDeep(this.mouseInfo),
      movingInfo: _cloneDeep(this.movingInfo),
      // 与 MarkingItem 有关状态
      itemStatsList: this.getAllStats(),
      itemStatsCreating,
      itemStatsHovering,
      itemStatsHighlighting,
      itemStatsSelected,
      // 根据 MarkingItemStats 计算得出的结果
      creating: !!itemStatsCreating,
      creatingStarted: itemStatsCreating ? itemStatsCreating.path.length > 0 : false,
      creatingCrossing: !!itemStatsCreating?.crossing,
      creatingWillFinish: itemStatsCreating ? itemStatsCreating.creatingWillFinish : false,
      hovering: !!itemStatsHovering,
      hoveringPoint: itemStatsHovering?.path[itemStatsHovering.hoveringPointIndex] || null,
      hoveringPointIndex: itemStatsHovering?.hoveringPointIndex ?? -1,
      hoveringInsertionPointIndex: itemStatsHovering?.hoveringInsertionPointIndex ?? -1,
      hoveringBorderIndex: itemStatsHovering?.hoveringBorderIndex ?? -1,
      highlighting: !!itemStatsHighlighting,
      editing: !!itemStatsSelected,
      editingPathLength: itemStatsSelected ? itemStatsSelected.path.length : 0,
      editingDirty: itemStatsSelected ? itemStatsSelected.dirty : false,
      editingCrossing: itemStatsSelected ? itemStatsSelected.crossing : false,
      editingHovering: itemStatsSelected ? itemStatsSelected.hovering : false,
      editingHoveringPointIndex: itemStatsSelected ? itemStatsSelected.draggingPointIndex >= 0 ? itemStatsSelected.draggingPointIndex : itemStatsSelected.hoveringPointIndex : -1,
      editingHoveringInsertionPointIndex: itemStatsSelected ? itemStatsSelected.hoveringInsertionPointIndex : -1,
      editingHoveringBorderIndex: itemStatsSelected ? itemStatsSelected.hoveringBorderIndex : -1, // TODO check -1
      editingDragging: itemStatsSelected ? itemStatsSelected.dragging : false,
      editingDraggingPointIndex: itemStatsSelected ? itemStatsSelected.draggingPointIndex : -1,
      editingDraggingInsertionPointIndex: itemStatsSelected ? itemStatsSelected.draggingInsertionPointIndex : -1
    };
  }
}
