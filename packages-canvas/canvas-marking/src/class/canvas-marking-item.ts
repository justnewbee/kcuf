import _isEqual from 'lodash/isEqual';
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _clamp from 'lodash/clamp';
import _cloneDeep from 'lodash/cloneDeep';

import {
  Point,
  Path,
  isPointOnPath,
  isPointWithinPath,
  segmentLength,
  segmentMidpoint,
  pathArea,
  pathPerimeter,
  pathBbox,
  pathSegmentList,
  pathAngleList,
  checkPathForDuplicate,
  checkPathForInnerIntersection,
  translatePath
} from '@kcuf/geometry-basic';

import {
  EMarkingMouseStatus
} from '../enum';
import {
  TBeforeHook,
  TCreatingWillFinish,
  TMarkingBorderStyleResolved,
  TMarkingFillStyleResolved,
  TMarkingPointStyleResolved,
  ICanvasMarkingClassProtected,
  IMarkingItemClass,
  IMarkingItemOptions,
  IMarkingConfigItemBorderDiff,
  IMarkingItemStats
} from '../types';
import {
  DEFAULT_FILL_ALPHA_EDITING,
  DEFAULT_POINT_INSERTION_MIN_DISTANCE,
  DEFAULT_RIGHT_ANGLE_MARK_SIZE
} from '../const';
import {
  roundFloat,
  initDrawStyleBorder,
  initDrawStylePoint,
  initDrawStyleFill,
  canFinishRect,
  fadeStyleBorder,
  fadeStylePoint,
  fadeStyleFill,
  mergeBorderStyleWithDiff,
  getPathCreatingFree,
  getPathCreatingRect,
  getPathCreatingRect2,
  canvasPathPointShape,
  canvasCheckPointInStroke,
  canvasDrawPathBorder,
  canvasDrawPerpendicularMark,
  canvasDrawShape,
  canvasDrawArea
} from '../util';

export default class CanvasMarkingItem<T = unknown> implements IMarkingItemClass<T> {
  private readonly markingStage: ICanvasMarkingClassProtected<T>;
  
  protected options: IMarkingItemOptions<T>;
  
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
  private draggingPointIndex = -1; // 被拖拽顶点的 index
  private draggingInsertionPointIndex = -1; // 拖拽虚拟点的 index，虚点在拖拽的开始（第一次动）的时候，会转正
  
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
  
  constructor(markingStage: ICanvasMarkingClassProtected<T>, options: IMarkingItemOptions<T> = {}) {
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
    
    const minDistance = pointInsertionMinDistance / imageScale;
    const ignoredIndexes = _reduce(borderDiff, (result: number[], v, k) => {
      const index = Number(k);
      
      if (!isNaN(index) && v?.noInsertion) {
        result.push(index);
      }
      
      return result;
    }, []);
    
    return pathSegmentList(path).map((v, i) => {
      if (ignoredIndexes.includes(i)) {
        return null;
      }
      
      return minDistance > 0 && segmentLength(v) > minDistance ? segmentMidpoint(v) : null;
    });
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
    
    return pathSegmentList(this.path).findIndex(v => {
      return canvasCheckPointInStroke(canvasContext, imageMouse, v, lineWidth);
    });
  }
  
  private clearDragging(): void {
    this.draggingStartCoords = null;
    this.draggingPointIndex = -1;
    this.draggingInsertionPointIndex = -1;
    this.pathSnapshotDragging = [];
    this.draggingMoved = false;
  }
  
  private clearEditing(): void {
    this.clearDragging();
    this.pathSnapshotEditing = [];
    this.editing = false;
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
      options,
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
    switch (options.type) {
    case 'rect':
      return getPathCreatingRect(path, imageMouse);
    case 'rect2':
      return getPathCreatingRect2(path, imageMouse, [[0, 0], imageSize]);
    default:
      return getPathCreatingFree(path, imageMouse);
    }
  }
  
  private generateStats(): IMarkingItemStats<T> {
    const {
      markingStage: {
        imageSize,
        imageScale
      },
      options,
      path,
      pathSnapshotEditing,
      hovering,
      hoveringPointIndex,
      hoveringInsertionPointIndex,
      pointCountRange: [min, max]
    } = this;
    const pathForDraw = this.getPathForDraw();
    const crossing = this.detectCrossingAndOverlap();
    const area = roundFloat(pathArea(pathForDraw), 2);
    let creatingWillFinish: TCreatingWillFinish = false;
    
    // 针对新建，是否下一个点击将自动完成新建
    if (this.creating && !crossing) {
      switch (options.type) {
      case 'rect':
      case 'rect2':
        creatingWillFinish = canFinishRect(pathForDraw, imageScale); // 自由矩形只需要三个点
        
        break;
      default:
        if (hoveringPointIndex === 0 && pathForDraw.length >= min) { // 手动闭合：在第一个点上，且已有点数 >= minPoint
          creatingWillFinish = 'close';
        } else if (max > 0 && pathForDraw.length >= max) {
          creatingWillFinish = true;
        }
        
        break;
      }
    }
    
    return {
      data: options.data,
      path: _cloneDeep(path), // 得到一个干净的，从而避免引用干扰（尤其是 immer 这种会锁对象的）
      disabled: this.options.disabled || false,
      length: pathPerimeter(pathForDraw),
      area,
      areaPercentage: roundFloat(area * 100 / (imageSize[0] * imageSize[1]), 2),
      creatingWillFinish,
      hovering,
      hoveringPointIndex,
      hoveringInsertionPointIndex,
      hoveringBorderIndex: !hovering || hoveringPointIndex >= 0 || hoveringInsertionPointIndex >= 0 ? -1 : this.hoveringBorderIndex,
      highlighting: this.highlighting,
      highlightingBorderIndex: this.highlightingBorderIndex,
      editing: this.editing,
      dirty: pathSnapshotEditing.length > 0 && !_isEqual(pathSnapshotEditing, pathForDraw),
      crossing,
      dragging: !!this.draggingStartCoords,
      draggingMoved: this.draggingMoved,
      draggingPointIndex: this.draggingPointIndex,
      draggingInsertionPointIndex: this.draggingInsertionPointIndex
    };
  }
  
  private shouldDrawPoint(): boolean {
    return this.creating || this.editing || this.hovering;
  }
  
  private drawArea(): void {
    canvasDrawArea(this.markingStage.canvasContext, this.getPathForDraw(), {
      color: this.getDrawStyleFill().color
    });
  }
  
  private drawBorder(): void {
    const {
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
    const diffAll = highlightingBorderIndex !== null && highlightingBorderIndex < 0 ? borderDiff?.hover || borderDiff?.all : borderDiff?.all;
    
    this.drawPerpendicularMarks(borderStyle);
    this.drawBorderPartial(pathForDraw, mergeBorderStyleWithDiff(borderStyle, diffAll, faded), close);
    
    const segmentList = pathSegmentList(pathForDraw);
    
    _forEach(borderDiff, (diff, k) => {
      const segment = segmentList[Number(k)];
      
      if (!segment || !diff) {
        return;
      }
      
      const mergedStyle = mergeBorderStyleWithDiff(borderStyle, diff, faded);
      
      if (mergedStyle !== borderStyle) {
        this.drawBorderPartial(segment, mergedStyle);
      }
    });
    
    // 单根边样式 diff
    const hoveringBorder = hoveringBorderIndex >= 0 ? segmentList[hoveringBorderIndex] : undefined;
    const mergedStyleHover = mergeBorderStyleWithDiff(borderStyle, borderDiff?.hover, faded);
    
    if (hoveringBorder && mergedStyleHover !== borderStyle) {
      this.drawBorderPartial(hoveringBorder, mergedStyleHover);
    }
    
    if (highlightingBorderIndex !== null && highlightingBorderIndex >= 0 && highlightingBorderIndex !== hoveringBorderIndex) {
      const highlightingBorder = segmentList[highlightingBorderIndex];
      const mergedStyleHighlighting = mergeBorderStyleWithDiff(borderStyle, borderDiff?.hover, faded);
      
      if (highlightingBorder && mergedStyleHighlighting !== borderStyle) {
        this.drawBorderPartial(highlightingBorder, mergedStyleHighlighting);
      }
    }
  }
  
  private drawBorderPartial(path: Path, borderStyle: TMarkingBorderStyleResolved, close?: boolean): void {
    const {
      markingStage: {
        canvasContext,
        imageScale
      }
    } = this;
    
    if (borderStyle.outerWidth > 0) { // 如果有外线宽度差，则先渲染外线，这样会形成一条带边框的线
      canvasDrawPathBorder(canvasContext, path, {
        scale: imageScale,
        width: borderStyle.width + borderStyle.outerWidth * 2,
        color: borderStyle.outerColor,
        lineJoin: borderStyle.lineJoin,
        close
      });
    }
    
    canvasDrawPathBorder(canvasContext, path, {
      scale: imageScale,
      width: borderStyle.width,
      color: borderStyle.color,
      lineJoin: borderStyle.lineJoin,
      close
    });
  }
  
  private drawPerpendicularMarks(borderStyle: TMarkingBorderStyleResolved): void {
    if (!this.creating && !(this.draggingPointIndex >= 0 && this.draggingMoved)) {
      return;
    }
    
    const {
      markingStage: {
        options: {
          perpendicularMarkSize = DEFAULT_RIGHT_ANGLE_MARK_SIZE
        },
        canvasContext,
        imageScale
      }
    } = this;
    
    pathAngleList(this.getPathForDraw()).forEach(v => canvasDrawPerpendicularMark(canvasContext, v, {
      scale: imageScale,
      size: perpendicularMarkSize,
      color: borderStyle.color
    }));
  }
  
  private drawPoints(): void {
    if (!this.shouldDrawPoint()) {
      return;
    }
    
    const pointStyle = this.getDrawStylePoint();
    
    this.drawInsertionPoints(pointStyle); // 先画虚点，避免实点距离过近的时候的显示问题
    this.drawVertexPoints(pointStyle);
  }
  
  private drawInsertionPoints(pointStyle: TMarkingPointStyleResolved): void {
    const {
      markingStage: {
        canvasContext,
        imageScale
      }
    } = this;
    
    this.insertionPoints.forEach(v => {
      if (!v) {
        return;
      }
      
      canvasDrawShape(canvasContext, v, {
        scale: imageScale,
        type: pointStyle.typeMiddle,
        radius: pointStyle.radius,
        // 注意这里会调换顺序
        lineWidth: pointStyle.lineWidth * 0.75,
        lineColor: pointStyle.fillColor,
        fillColor: pointStyle.lineColor
      });
    });
  }
  
  private drawVertexPoints(pointStyle: TMarkingPointStyleResolved): void {
    const {
      markingStage: {
        canvasContext,
        imageScale
      },
      statsSnapshot
    } = this;
    
    this.getPathForDraw().forEach((v, i) => canvasDrawShape(canvasContext, v, {
      scale: imageScale,
      type: pointStyle.type,
      radius: i === 0 && statsSnapshot.creatingWillFinish === 'close' ? pointStyle.radius * (1 + pointStyle.radiusEnlargeWhenClose) : pointStyle.radius,
      lineWidth: pointStyle.lineWidth,
      lineColor: pointStyle.lineColor,
      fillColor: pointStyle.fillColor
    }));
  }
  
  /**
   * 检查 path 中是否有任何两条不相邻线存在交叉，以及是否有点在别的线上
   */
  private detectCrossingAndOverlap(): boolean {
    if (this.options.noCrossingDetection) {
      return false;
    }
    
    const pathForDraw = this.getPathForDraw();
    
    return (!this.creating && checkPathForDuplicate(pathForDraw)) || checkPathForInnerIntersection(pathForDraw);
  }
  
  private removePointCreating(): number {
    if (this.path.length <= 0) {
      return -1;
    }
    
    const removedIndex = this.path.length - 1;
    
    this.path.splice(removedIndex, 1);
    
    return removedIndex;
  }
  
  private removePointEditing(): number {
    const {
      path,
      hoveringPointIndex,
      pointCountRange: [min]
    } = this;
    
    if (!this.editing || path.length <= min || hoveringPointIndex < 0) {
      return -1;
    }
    
    path.splice(hoveringPointIndex, 1);
    
    this.refreshStats();
    
    return hoveringPointIndex;
  }
  
  getBorderColor(): string {
    return this.borderStyle.color;
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
    
    if (isPointWithinPath(imageMouse, path)) {
      return EMarkingMouseStatus.IN;
    }
    
    return EMarkingMouseStatus.OUT;
  }
  
  isUnderMouse(): boolean {
    return this.checkMouse() !== EMarkingMouseStatus.OUT;
  }
  
  select(): void {
    if (this.editing) {
      return;
    }
    
    this.editing = true;
    this.pathSnapshotEditing = _cloneDeep(this.path);
  }
  
  finishCreating(beforeCreateComplete?: TBeforeHook<T>): boolean {
    if (!this.creating || this.path.length < this.pointCountRange[0] || this.stats.crossing) {
      return false;
    }
    
    this.creating = false;
    
    const stats = this.refreshStats();
    const newPath = beforeCreateComplete?.(stats);
    
    if (newPath) {
      this.path = newPath;
      this.refreshStats();
    }
    
    return true;
  }
  
  finishEditing(cancel?: boolean): boolean {
    const {
      editing,
      pathSnapshotEditing,
      stats
    } = this;
    
    if (!editing) {
      return false;
    }
    
    // 取消编辑，或者有交叉，则还原
    if (cancel || stats.crossing) {
      this.path = pathSnapshotEditing;
    }
    
    this.clearEditing();
    this.refreshStats();
    
    return cancel || stats.dirty;
  }
  
  pushPoint(): boolean | 'close' | 'last' {
    if (!this.creating) {
      return false;
    }
    
    const {
      hoveringPointIndex,
      pointCountRange: [, max],
      statsSnapshot
    } = this;
    
    if (hoveringPointIndex >= 0) { // 在已有的点上
      return statsSnapshot.creatingWillFinish === 'close' ? 'close' : false;
    }
    
    const {
      markingStage: {
        imageMouse,
        imageScale
      },
      options,
      stats
    } = this;
    let newPath: Path | undefined;
    let last = false;
    
    switch (options.type) {
    case 'rect': // path 只可能是 0、1、4 个点
    case 'rect2': // path 只可能是 0、1、2、4 个点
      newPath = this.getPathForDraw();
      
      if (newPath.length >= 4) {
        if (canFinishRect(newPath, imageScale)) { // TODO 这里和 creatingWillFinish 有点冗余
          this.path = newPath;
          
          last = true;
        }
      } else {
        this.path = newPath;
      }
      
      break;
    default:
      last = max > 0 && this.path.length + 1 >= max;
      
      if (last && stats.crossing) { // 即将添加的是最末一个点，需避免 crossing
        return false;
      }
      
      if (isPointOnPath(imageMouse, this.path, true)) {
        return false;
      }
      
      this.path.push(imageMouse);
      
      break;
    }
    
    return last ? 'last' : true;
  }
  
  removePoint(): number {
    return this.creating ? this.removePointCreating() : this.removePointEditing();
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
    this.draggingPointIndex = hoveringPointIndex;
    this.draggingInsertionPointIndex = hoveringInsertionPointIndex;
    this.draggingStartCoords = imageMouse;
    this.pathSnapshotDragging = _cloneDeep(this.path);
    
    return true;
  }
  
  processDragging(): boolean | number {
    if (!this.draggingStartCoords) {
      return false;
    }
    
    const {
      markingStage: {
        imageSize,
        imageMouse
      },
      draggingPointIndex,
      draggingInsertionPointIndex,
      draggingStartCoords
    } = this;
    
    this.draggingMoved = true;
    
    if (draggingPointIndex >= 0) { // 拖动单个顶点，直接改
      const p = this.path[draggingPointIndex];
      
      if (p) { // 理论不会有空的情况
        p[0] = imageMouse[0];
        p[1] = imageMouse[1];
        
        return true;
      }
      
      return false;
    }
    
    if (draggingInsertionPointIndex >= 0) { // 拖动的是虚拟点，转正
      this.path.splice(draggingInsertionPointIndex + 1, 0, [imageMouse[0], imageMouse[1]]); // 新一个 Point，避免类似 immer 的锁对象行为造成问题
      this.draggingPointIndex = draggingInsertionPointIndex + 1;
      this.draggingInsertionPointIndex = -1; // 消除
      this.refreshStats();
      
      return draggingInsertionPointIndex;
    }
    
    // 拖动整体图形
    const [[xMin, yMin], [xMax, yMax]] = pathBbox(this.pathSnapshotDragging);
    
    this.path = translatePath(this.pathSnapshotDragging, [
      _clamp(imageMouse[0] - draggingStartCoords[0], -xMin, imageSize[0] - xMax),
      _clamp(imageMouse[1] - draggingStartCoords[1], -yMin, imageSize[1] - yMax)
    ]);
    
    return true;
  }
  
  finishDragging(beforeEditDragEnd?: TBeforeHook<T>): boolean {
    if (!this.draggingStartCoords) {
      return false;
    }
    
    const {
      draggingMoved
    } = this;
    
    this.clearDragging();
    
    if (draggingMoved) {
      const stats = this.refreshStats();
      const newPath = beforeEditDragEnd?.(stats);
      
      if (newPath) {
        this.path = newPath;
        this.refreshStats();
      }
    }
    
    return draggingMoved;
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
