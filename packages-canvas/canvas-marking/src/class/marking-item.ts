import {
  isEqual as _isEqual,
  forEach as _forEach,
  reduce as _reduce,
  clamp as _clamp,
  cloneDeep as _cloneDeep
} from 'lodash-es';

import {
  Point,
  Path,
  checkInPathPointDuplicate,
  checkInPathSegmentCrossing,
  checkInPathPointOverlappingSegment,
  isPointInsidePolygon,
  getPathLength,
  getPathArea,
  getPathBoundaryRect,
  getPathMiddlePointList,
  getSegmentList
} from '@kcuf/geometry-basic';

import {
  EMarkingMouseStatus
} from '../enum';
import {
  TMarkingBorderStyleResolved,
  TMarkingFillStyleResolved,
  TMarkingPointStyleResolved,
  IMarkingStageClassProtected,
  IMarkingItemClass,
  IMarkingItemOptions,
  IMarkingConfigItemBorderDiff,
  IMarkingItemStats
} from '../types';
import {
  DEFAULT_FILL_ALPHA_EDITING,
  DEFAULT_POINT_INSERTION_MIN_DISTANCE
} from '../const';
import {
  roundFloat,
  initDrawStyleBorder,
  initDrawStylePoint,
  initDrawStyleFill,
  fadeStyleBorder,
  fadeStylePoint,
  fadeStyleFill,
  mergeBorderStyleWithDiff,
  getPathCreatingRect,
  getPathCreatingRect2,
  canvasDrawArea,
  canvasPathPointShape,
  canvasCheckPointInStroke,
  markingDrawBorder,
  markingDrawInsertionPoint,
  markingDrawPoint
} from '../util';

export default class MarkingItem<T> implements IMarkingItemClass<T> {
  private readonly markingStage: IMarkingStageClassProtected<T>;
  
  private options: IMarkingItemOptions<T>;
  
  private path: Path = []; // 永远是相对于图片大小的位置
  private pathSnapshotEditing: Path = []; // 编辑结束后，需要它
  private pathSnapshotDragging: Path = []; // 拖拽整体的时候，需要一个快照用于计算
  
  private creating = false; // 创建中
  private hovering = false; // 是否在鼠标下（鼠标动作触发）
  private highlighting = false; // 代码触发：高亮
  private highlightingBorderIndex: number | null = null; // 代码触发：仅高亮某一条线，需配合 highlighting，-1 表示高亮整个框
  private editing = false;
  /**
   * 处于拖拽中状态（鼠标动作触发）
   */
  private draggingStartCoords: Point | null = null;
  private draggingMoved = false; // 但只有鼠标落下后真正移动了，才是否真正拖动过
  private draggingPoint = -1; // 被拖拽顶点的 index
  private draggingInsertionPoint = -1; // 拖拽虚拟点的 index，虚点在拖拽的开始（第一次动）的时候，会转正
  
  private statsSnapshot: IMarkingItemStats<T>;
  
  private faded = false;
  
  private readonly borderStyle: TMarkingBorderStyleResolved;
  private readonly borderStyleHovering: TMarkingBorderStyleResolved;
  private readonly borderStyleHighlighting: TMarkingBorderStyleResolved;
  private readonly borderStyleEditing: TMarkingBorderStyleResolved;
  
  private readonly pointStyle: TMarkingPointStyleResolved;
  private readonly pointStyleHovering: TMarkingPointStyleResolved;
  private readonly pointStyleHighlighting: TMarkingPointStyleResolved;
  private readonly pointStyleEditing: TMarkingPointStyleResolved;
  
  private readonly fillStyle: TMarkingFillStyleResolved;
  private readonly fillStyleHovering: TMarkingFillStyleResolved;
  private readonly fillStyleHighlighting: TMarkingFillStyleResolved;
  private readonly fillStyleEditing: TMarkingFillStyleResolved;
  
  constructor(markingStage: IMarkingStageClassProtected<T>, options: IMarkingItemOptions<T> = {}) {
    this.markingStage = markingStage;
    this.options = options;
    
    this.borderStyle = initDrawStyleBorder(options.borderStyle);
    this.borderStyleHovering = initDrawStyleBorder(options.borderStyleHovering, this.borderStyle);
    this.borderStyleHighlighting = initDrawStyleBorder(options.borderStyleHighlighting, this.borderStyleHovering);
    this.borderStyleEditing = initDrawStyleBorder(options.borderStyleEditing, this.borderStyleHovering);
    
    this.pointStyle = initDrawStylePoint(this.borderStyle, options.pointStyle);
    this.pointStyleHovering = initDrawStylePoint(this.borderStyleHovering, options.pointStyleHovering, this.pointStyle);
    this.pointStyleHighlighting = initDrawStylePoint(this.borderStyleHighlighting, options.pointStyleHighlighting, this.pointStyleHovering);
    this.pointStyleEditing = initDrawStylePoint(this.borderStyleEditing, options.pointStyleEditing, this.pointStyleHovering);
    
    this.fillStyle = initDrawStyleFill(this.borderStyle, options.fillStyle);
    this.fillStyleHovering = initDrawStyleFill(this.borderStyleHovering, options.fillStyleHovering, this.fillStyle);
    this.fillStyleHighlighting = initDrawStyleFill(this.borderStyleHighlighting, options.fillStyleHighlighting, this.fillStyleHovering);
    this.fillStyleEditing = initDrawStyleFill(this.borderStyleEditing, {
      color: DEFAULT_FILL_ALPHA_EDITING,
      ...options.fillStyleEditing
    }, this.fillStyleHovering);
    
    if (options.path?.length) { // 传入 path 表示已成图形，不传则表示新建
      this.path = _cloneDeep(options.path); // 因为可能要改它
    } else {
      this.creating = true;
    }
    
    this.statsSnapshot = this.generateStats();
  }
  
  /**
   * 默认最少必须 3 个点（区域），若指定 2 则允许线段
   */
  private get pointCountRange(): [number, number] {
    let {
      options: {
        pointCountMin: min = 3,
        pointCountMax: max = 0
      }
    } = this;
    
    if (min < 2) {
      min = 3;
    }
    
    if (max > 0 && max < min) {
      max = min;
    }
    
    return [min, max];
  }
  
  private get borderDiff(): IMarkingConfigItemBorderDiff | undefined {
    const {
      options: {
        data,
        borderDiff
      }
    } = this;
    
    if (!borderDiff) {
      return;
    }
    
    if (typeof borderDiff === 'function') {
      return borderDiff(data);
    }
    
    return borderDiff;
  }
  
  /**
   * 编辑中，且允许在虚点上脱出新增时，需要渲染虚点
   */
  private get insertionPoints(): (Point | null)[] {
    const {
      markingStage: {
        imageScale
      },
      options: {
        pointInsertionMinDistance = DEFAULT_POINT_INSERTION_MIN_DISTANCE,
        noPointInsertion
      },
      path,
      editing,
      pointCountRange: [, max],
      borderDiff
    } = this;
    
    if (noPointInsertion || !editing || (max > 0 && path.length >= max)) {
      return [];
    }
    
    return getPathMiddlePointList(path, pointInsertionMinDistance / imageScale, _reduce(borderDiff, (result: number[], v, k) => {
      const index = Number(k);
      
      if (!isNaN(index) && v?.noInsertion) {
        result.push(index);
      }
      
      return result;
    }, []));
  }
  
  /**
   * 如果 mouseCoords 在任何顶点，则返回此顶点 index
   */
  private get hoveringPointIndex(): number {
    if (!this.shouldDrawPoint()) {
      return -1;
    }
    
    const {
      markingStage: {
        canvasContext,
        imageScale,
        imageMouse
      },
      pointStyle
    } = this;
    
    return this.path.findIndex(v => {
      canvasPathPointShape(canvasContext, v, pointStyle.radius / imageScale, pointStyle.type);
      
      return canvasContext.isPointInPath(imageMouse[0], imageMouse[1]);
    });
  }
  
  /**
   * 如果 mouseCoords 在任何中点，则返回该中点的 index
   */
  private get hoveringInsertionPointIndex(): number {
    const {
      markingStage: {
        canvasContext,
        imageScale,
        imageMouse
      },
      insertionPoints,
      pointStyle
    } = this;
    
    return insertionPoints.findIndex(v => {
      if (v) {
        canvasPathPointShape(canvasContext, v, pointStyle.radius / imageScale, pointStyle.typeMiddle);
        
        return canvasContext.isPointInPath(imageMouse[0], imageMouse[1]);
      }
      
      return false;
    });
  }
  
  private get hoveringBorderIndex(): number {
    const {
      markingStage: {
        canvasContext,
        imageScale,
        imageMouse
      },
      borderDiff
    } = this;
    const borderStyle = mergeBorderStyleWithDiff(this.borderStyleHovering, borderDiff?.hover, this.faded);
    const lineWidth = (borderStyle.width + borderStyle.outerWidth * 2) / imageScale; // 考虑边的外框
    
    return getSegmentList(this.path).findIndex(v => {
      return canvasCheckPointInStroke(canvasContext, imageMouse, v, lineWidth);
    });
  }
  
  /**
   * 根据状态返回对应的样式
   */
  private getDrawStyleBorder(): TMarkingBorderStyleResolved {
    const {
      borderStyle,
      borderStyleHighlighting,
      borderStyleHovering,
      borderStyleEditing,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let style = borderStyle;
    
    if (editing) {
      style = borderStyleEditing;
    } else if (hovering) {
      style = borderStyleHovering;
    } else if (highlighting) {
      style = borderStyleHighlighting;
    }
    
    if (crossing) {
      return {
        ...style,
        color: style.crossingColor || style.color,
        outerColor: style.crossingOuterColor || style.outerColor
      };
    }
    
    return this.faded ? fadeStyleBorder(style) : style;
  }
  
  private getDrawStylePoint(): TMarkingPointStyleResolved {
    const {
      pointStyle,
      pointStyleHighlighting,
      pointStyleHovering,
      pointStyleEditing,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let style = pointStyle;
    
    if (editing) {
      style = pointStyleEditing;
    } else if (hovering) {
      style = pointStyleHovering;
    } else if (highlighting) {
      style = pointStyleHighlighting;
    }
    
    if (crossing) {
      return {
        ...style,
        lineColor: style.crossingLineColor,
        fillColor: style.crossingFillColor
      };
    }
    
    return this.faded ? fadeStylePoint(style) : style;
  }
  
  private getDrawStyleFill(): TMarkingFillStyleResolved {
    const {
      fillStyle,
      fillStyleHighlighting,
      fillStyleHovering,
      fillStyleEditing,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let style = fillStyle;
    
    if (editing) {
      style = fillStyleEditing;
    } else if (hovering) {
      style = fillStyleHovering;
    } else if (highlighting) {
      style = fillStyleHighlighting;
    }
    
    if (crossing) {
      return {
        ...style,
        color: style.crossingColor
      };
    }
    
    return this.faded ? fadeStyleFill(style) : style;
  }
  
  /**
   * 根据状态获取 path
   */
  private getPathForDraw(): Path {
    const {
      markingStage: {
        imageSize,
        imageMouse
      },
      path
    } = this;
    const [p1] = path;
    
    if (!this.creating || (path.length === 1 && _isEqual(p1, imageMouse))) {
      return _cloneDeep(path);
    }
    
    // 以下为新建中的路径
    switch (this.options.type) {
      case 'rect':
        return getPathCreatingRect(path, imageMouse);
      case 'rect2':
        return getPathCreatingRect2(path, imageMouse, [[0, 0], imageSize]);
      default:
        return [...path, imageMouse];
    }
  }
  
  private generateStats(): IMarkingItemStats<T> {
    const {
      markingStage: {
        imageSize
      },
      options,
      path,
      pathSnapshotEditing,
      hovering,
      hoveringPointIndex,
      hoveringInsertionPointIndex,
      pointCountRange: [, max]
    } = this;
    const pathForDraw = this.getPathForDraw();
    const area = roundFloat(getPathArea(pathForDraw), 2);
    let willFinishCreating = false;
    
    // 针对新建，是否下一个点击将自动完成新建
    if (this.creating) {
      switch (options.type) {
        case 'rect':
        case 'rect2':
          willFinishCreating = pathForDraw.length >= 4; // 自由矩形只需要三个点
          
          break;
        default:
          if (max > 0) {
            willFinishCreating = pathForDraw.length >= max;
          }
          
          break;
      }
    }
    
    return {
      data: options.data,
      path: [...path], // 得到一个干净的，从而避免引用干扰
      disabled: this.options.disabled || false,
      length: getPathLength(pathForDraw),
      area,
      areaPercentage: roundFloat(area * 100 / (imageSize[0] * imageSize[1]), 2),
      willFinishCreating,
      hovering,
      hoveringPointIndex,
      hoveringInsertionPointIndex,
      hoveringBorderIndex: !hovering || hoveringPointIndex >= 0 || hoveringInsertionPointIndex >= 0 ? -1 : this.hoveringBorderIndex,
      highlighting: this.highlighting,
      highlightingBorderIndex: this.highlightingBorderIndex,
      editing: this.editing,
      dirty: pathSnapshotEditing.length > 0 && !_isEqual(pathSnapshotEditing, pathForDraw),
      crossing: this.detectCrossingAndOverlap(),
      dragging: !!this.draggingStartCoords,
      draggingMoved: this.draggingMoved,
      draggingPoint: this.draggingPoint,
      draggingInsertionPoint: this.draggingInsertionPoint
    };
  }
  
  private shouldDrawPoint(): boolean {
    return this.creating || this.highlighting || this.hovering || this.editing;
  }
  
  private drawArea(): void {
    canvasDrawArea(this.markingStage.canvasContext, this.getPathForDraw(), this.getDrawStyleFill().color);
  }
  
  private drawBorder(): void {
    const {
      markingStage: {
        canvasContext,
        imageScale
      },
      options: {
        type
      },
      borderDiff,
      faded,
      stats: {
        hoveringBorderIndex,
        highlightingBorderIndex
      }
    } = this;
    const pathForDraw = this.getPathForDraw();
    const borderStyle = this.getDrawStyleBorder();
    const close = !this.creating || type === 'rect' || type === 'rect2';
    const diffAll = highlightingBorderIndex !== null && highlightingBorderIndex < 0 ? borderDiff?.highlight || borderDiff?.all : borderDiff?.all;
    
    markingDrawBorder(canvasContext, pathForDraw, mergeBorderStyleWithDiff(borderStyle, diffAll, faded), imageScale, close);
    
    const segmentList = getSegmentList(pathForDraw);
    
    _forEach(borderDiff, (diff, k) => {
      const segment = segmentList[Number(k)];
      
      if (!segment || !diff) {
        return;
      }
      
      const mergedStyle = mergeBorderStyleWithDiff(borderStyle, diff, faded);
      
      if (mergedStyle !== borderStyle) {
        markingDrawBorder(canvasContext, segment, mergedStyle, imageScale);
      }
    });
    
    // 单根边样式 diff
    const hoveringBorder = hoveringBorderIndex >= 0 ? segmentList[hoveringBorderIndex] : undefined;
    const mergedStyleHover = mergeBorderStyleWithDiff(borderStyle, borderDiff?.hover, faded);
    
    if (hoveringBorder && mergedStyleHover !== borderStyle) {
      markingDrawBorder(canvasContext, hoveringBorder, mergedStyleHover, imageScale);
    }
    
    if (highlightingBorderIndex !== null && highlightingBorderIndex >= 0 && highlightingBorderIndex !== hoveringBorderIndex) {
      const highlightingBorder = segmentList[highlightingBorderIndex];
      const mergedStyleHighlighting = mergeBorderStyleWithDiff(borderStyle, borderDiff?.highlight, faded);
      
      if (highlightingBorder && mergedStyleHighlighting !== borderStyle) {
        markingDrawBorder(canvasContext, highlightingBorder, mergedStyleHighlighting, imageScale);
      }
    }
  }
  
  private drawPoints(): void {
    if (!this.shouldDrawPoint()) {
      return;
    }
    
    const {
      markingStage: {
        canvasContext,
        imageScale
      }
    } = this;
    const pointStyle = this.getDrawStylePoint();
    
    // 先画虚点，避免实点距离过近的时候的显示问题
    this.insertionPoints.forEach(v => {
      if (v) {
        markingDrawInsertionPoint(canvasContext, v, pointStyle, imageScale);
      }
    });
    
    this.getPathForDraw().forEach(v => markingDrawPoint(canvasContext, v, pointStyle, imageScale));
  }
  
  /**
   * 检查 path 中是否有任何两条不相邻线存在交叉，以及是否有点在别的线上
   */
  private detectCrossingAndOverlap(): boolean {
    if (this.options.noCrossingDetection) {
      return false;
    }
    
    const pathForDraw = this.getPathForDraw();
    
    return (!this.creating && checkInPathPointDuplicate(pathForDraw)) || checkInPathSegmentCrossing(pathForDraw) || checkInPathPointOverlappingSegment(pathForDraw);
  }
  
  toggleHovering(value = true): void {
    this.hovering = value;
  }
  
  toggleHighlighting(value = true, borderIndex: number | null = null): void {
    this.highlighting = value;
    this.highlightingBorderIndex = value ? borderIndex : null;
  }
  
  checkMouse(): EMarkingMouseStatus {
    const {
      markingStage: {
        imageMouse
      },
      path
    } = this;
    
    if (this.hoveringPointIndex >= 0) {
      return EMarkingMouseStatus.IN_POINT;
    }
    
    if (this.hoveringInsertionPointIndex >= 0) {
      return EMarkingMouseStatus.IN_POINT_INSERTION;
    }
    
    if (this.hoveringBorderIndex >= 0) {
      return EMarkingMouseStatus.IN_BORDER;
    }
    
    if (isPointInsidePolygon(imageMouse, path)) {
      return EMarkingMouseStatus.IN;
    }
    
    return EMarkingMouseStatus.OUT;
  }
  
  isUnderMouse(): boolean {
    return this.checkMouse() !== EMarkingMouseStatus.OUT;
  }
  
  finishCreating(): void {
    if (!this.creating || this.path.length < this.pointCountRange[0] || this.stats.crossing) {
      return;
    }
    
    this.creating = false;
    this.options.onCreate?.(this.refreshStats());
    
    this.select();
  }
  
  select(): void {
    if (this.editing) {
      return;
    }
    
    this.editing = true;
    this.pathSnapshotEditing = _cloneDeep(this.path);
  }
  
  finishEditing(restore?: boolean): void {
    if (!this.editing) {
      return;
    }
    
    this.editing = false;
    
    const {
      markingStage
    } = this;
    
    // 取消编辑，或者有交叉，则还原
    if (restore || this.stats.crossing) {
      this.path = this.pathSnapshotEditing;
      
      markingStage.options.onMarkingEditCancel?.(this.refreshStats(), markingStage.getItemStatsList());
    } else {
      markingStage.options.onMarkingEditComplete?.(this.refreshStats(), markingStage.getItemStatsList());
    }
    
    this.pathSnapshotEditing = [];
  }
  
  pushPoint(): void {
    if (!this.creating) {
      return;
    }
    
    const {
      path,
      hoveringPointIndex,
      pointCountRange: [min, max]
    } = this;
    
    if (hoveringPointIndex >= 0) { // 在已有的点上
      if (hoveringPointIndex === 0 && path.length >= min) { // 手动闭合：在第一个点上，且已有点数 >= minPoint
        this.finishCreating();
      }
      
      return;
    }
    
    const {
      markingStage: {
        imageMouse
      },
      options,
      stats
    } = this;
    
    const pathForDraw = this.getPathForDraw();
    let last: boolean;
    
    switch (options.type) {
      case 'rect': // 利用对角线两个点，生成矩形的 4 个点
      case 'rect2': // 先画一条边的两个点，再利用第三个点确定另一条平行边所在的位置，从而确定一个矩形
        path.length = 0; // 不要改 this.path 的引用
        path.push(...pathForDraw);
        
        last = path.length >= 4;
        
        break;
      default:
        last = max > 0 && path.length + 1 >= max;
        
        // 即将添加的是最末一个点，需避免 crossing
        if (last && stats.crossing) {
          return;
        }
        
        path.push(imageMouse);
        
        break;
    }
    
    if (last) {
      this.finishCreating(); // 自动闭合
    }
  }
  
  removePoint(): boolean {
    return this.creating ? this.removePointCreating() : this.removePointEditing();
  }
  
  removePointCreating(): boolean {
    if (this.path.length <= 0) {
      return false;
    }
    
    this.path.splice(this.path.length - 1, 1);
    
    return true;
  }
  
  removePointEditing(): boolean {
    const {
      markingStage,
      path,
      hoveringPointIndex,
      pointCountRange: [min]
    } = this;
    
    if (!this.editing || path.length <= min) {
      return false;
    }
    
    if (hoveringPointIndex < 0) {
      return false;
    }
    
    path.splice(hoveringPointIndex, 1);
    
    markingStage.options.onMarkingPointRemove?.(this.refreshStats(), hoveringPointIndex, markingStage.getItemStatsList());
    
    return true;
  }
  
  startDragging(): boolean {
    const {
      markingStage: {
        imageMouse
      },
      hoveringPointIndex,
      hoveringInsertionPointIndex
    } = this;
    
    if (!this.isUnderMouse()) {
      return false;
    }
    
    if (!(hoveringPointIndex >= 0 || hoveringInsertionPointIndex >= 0) && this.options.noDragWhole) {
      return false;
    }
    
    // 缓存住
    this.draggingPoint = hoveringPointIndex;
    this.draggingInsertionPoint = hoveringInsertionPointIndex;
    this.draggingStartCoords = imageMouse;
    this.pathSnapshotDragging = _cloneDeep(this.path);
    
    return true;
  }
  
  processDragging(): void {
    if (!this.draggingStartCoords) {
      return;
    }
    
    const {
      markingStage,
      markingStage: {
        imageSize,
        imageMouse
      },
      draggingPoint,
      draggingInsertionPoint,
      draggingStartCoords
    } = this;
    
    this.draggingMoved = true;
    
    if (draggingPoint >= 0) { // 拖动单个顶点，直接改
      const p = this.path[draggingPoint];
      
      if (p) { // 理论不会有空的情况
        p[0] = imageMouse[0];
        p[1] = imageMouse[1];
      }
      
      return;
    }
    
    if (draggingInsertionPoint >= 0) { // 拖动的是虚拟点，转正
      this.path.splice(draggingInsertionPoint + 1, 0, imageMouse);
      this.draggingPoint = draggingInsertionPoint + 1;
      this.draggingInsertionPoint = -1; // 消除
      
      markingStage.options.onMarkingPointInsert?.(this.refreshStats(), draggingInsertionPoint, markingStage.getItemStatsList());
      
      return;
    }
    
    // 拖动整体图形
    const [[xMin, yMin], [xMax, yMax]] = getPathBoundaryRect(this.pathSnapshotDragging);
    const dx = _clamp(imageMouse[0] - draggingStartCoords[0], -xMin, imageSize[0] - xMax);
    const dy = _clamp(imageMouse[1] - draggingStartCoords[1], -yMin, imageSize[1] - yMax);
    
    this.path = this.pathSnapshotDragging.map(v => [v[0] + dx, v[1] + dy]);
  }
  
  finishDragging(): void {
    if (!this.draggingStartCoords) {
      return;
    }
    
    const {
      markingStage
    } = this;
    
    this.draggingStartCoords = null;
    this.draggingPoint = -1;
    this.draggingInsertionPoint = -1;
    this.pathSnapshotDragging = [];
    
    if (this.draggingMoved) {
      this.draggingMoved = false;
      markingStage.options.onMarkingDragEnd?.(this.refreshStats(), markingStage.getItemStatsList());
    }
  }
  
  refreshStats(): IMarkingItemStats<T> {
    this.statsSnapshot = this.generateStats();
    
    return this.statsSnapshot;
  }
  
  /**
   * 画出自己，从底至上依次画区块、边线和拖拽点
   */
  draw(faded = false): void {
    this.faded = faded;
    
    this.drawArea();
    this.drawBorder();
    this.drawPoints();
  }
  
  get stats(): IMarkingItemStats<T> {
    return this.statsSnapshot;
  }
}