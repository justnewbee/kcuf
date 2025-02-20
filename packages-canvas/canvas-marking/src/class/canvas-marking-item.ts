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
  TEditable,
  TPointType,
  TCreatingWillFinish,
  TMarkingStyleBorderResolved,
  IMarkingStyleFillResolved,
  TMarkingStylePointResolved,
  ICanvasMarkingClassProtected,
  IMarkingItemClass,
  IMarkingItemOptions,
  IMarkingItemStats,
  IMarkingEvents,
  IMarkingStyleConfigResolved
} from '../types';
import {
  DEFAULT_POINT_INSERTION_MIN_DISTANCE,
  DEFAULT_RIGHT_ANGLE_MARK_SIZE
} from '../const';
import {
  canFinishRect,
  mergeBorderStyleWithDiff,
  resolveMarkingStyleConfig,
  generateUuid,
  getPathCreatingFree,
  getPathCreatingRect,
  getPathCreatingRect2,
  canvasPathPointShape,
  canvasCheckPointInStroke,
  canvasDrawPathBorder,
  canvasDrawPerpendicularMark,
  canvasDrawPointShape,
  canvasDrawArea
} from '../util';

export default class CanvasMarkingItem<T = unknown> implements IMarkingItemClass<T> {
  private readonly canvasMarking: ICanvasMarkingClassProtected<T>;
  private readonly style: IMarkingStyleConfigResolved;
  
  protected options: IMarkingItemOptions<T>;
  
  private readonly id: string;
  private data: T | undefined;
  private path: Path = []; // 永远是相对于图片大小的位置
  private pathSnapshotEditing: Path = []; // 编辑结束后，需要它
  private pathSnapshotDragging: Path = []; // 拖拽整体的时候，需要一个快照用于计算
  
  private creating = false; // 创建中
  private creatingWait = false; // 即将创建完成
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
  
  constructor(markingStage: ICanvasMarkingClassProtected<T>, options: IMarkingItemOptions<T> = {}) {
    this.canvasMarking = markingStage;
    this.options = options;
    this.id = options.id || generateUuid();
    this.style = resolveMarkingStyleConfig(options.styleConfig);
    this.data = options.data;
    
    if (options.path?.length) { // 传入 path 表示已成图形，不传则表示新建
      this.path = _cloneDeep(options.path); // 因为可能要改它
    } else {
      this.creating = true;
    }
    
    this.statsSnapshot = this.generateStats();
  }
  
  private get editable(): TEditable {
    const {
      canvasMarking: {
        options: {
          editable: editableOverall = true
        }
      },
      options: {
        editable = editableOverall
      }
    } = this;
    
    switch (editableOverall) {
    case 'locked':
      return 'locked';
    case false:
      return editable === 'locked' ? 'locked' : false;
    default:
      return editable;
    }
  }
  
  /**
   * 默认最少必须 3 个点，若指定 `min: 2` 则允许线段，1 则只画一个点
   */
  private get pointCountRange(): [number, number] {
    const max = this.options.pointCountMax ?? 0;
    let min = this.options.pointCountMin ?? 3;
    
    if (min < 1) {
      min = 1;
    }
    
    if (max > 0 && max < min) {
      min = max;
    }
    
    return [min, max];
  }
  
  /**
   * 编辑中，且允许在虚点上脱出新增时，需要渲染虚点
   */
  private get insertionPoints(): (Point | null)[] {
    const {
      canvasMarking: {
        imageScale
      },
      options: {
        pointInsertionMinDistance = DEFAULT_POINT_INSERTION_MIN_DISTANCE,
        noPointInsertion
      },
      style: {
        borderDiff
      },
      path,
      editing,
      pointCountRange: [, max]
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
   * 如果 `mouseCoords` 在任何顶点，则返回此顶点 `index`
   */
  private get hoveringPointIndex(): number {
    if (!this.shouldDrawPoint()) {
      return -1;
    }
    
    const {
      style
    } = this;
    
    return this.path.findIndex(v => this.isMouseInPoint(v, style.point.radius, style.point.type));
  }
  
  /**
   * 如果 mouseCoords 在任何中点，则返回该中点的 index
   */
  private get hoveringInsertionPointIndex(): number {
    const {
      style,
      insertionPoints
    } = this;
    
    return insertionPoints.findIndex(v => v ? this.isMouseInPoint(v, style.point.radiusMiddle, style.point.typeMiddle) : false);
  }
  
  private isMouseInPoint(point: Point, radius: number, pointType: TPointType): boolean {
    const {
      canvasMarking: {
        canvasContext,
        imageScale,
        imageMouse
      }
    } = this;
    
    canvasPathPointShape(canvasContext, point, radius / imageScale, pointType instanceof Image || pointType === 'cross' ? 'square' : pointType);
    
    return canvasContext.isPointInPath(imageMouse[0], imageMouse[1]);
  }
  
  private get hoveringBorderIndex(): number {
    const {
      canvasMarking: {
        canvasContext,
        imageScale,
        imageMouse
      },
      style: {
        borderDiff
      }
    } = this;
    const borderStyle = mergeBorderStyleWithDiff(this.style.borderHovering, borderDiff?.hover);
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
  private getDrawStyleBorder(): TMarkingStyleBorderResolved {
    const {
      style,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let borderStyle = style.border;
    
    if (editing) {
      borderStyle = style.borderEditing;
    } else if (hovering) {
      borderStyle = style.borderHovering;
    } else if (highlighting) {
      borderStyle = style.borderHighlighting;
    }
    
    return crossing ? {
      ...borderStyle,
      color: borderStyle.crossingColor || borderStyle.color,
      outerColor: borderStyle.crossingOuterColor || borderStyle.outerColor
    } : borderStyle;
  }
  
  private getDrawStylePoint(): TMarkingStylePointResolved {
    const {
      style,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let pointStyle = style.point;
    
    if (editing) {
      pointStyle = style.pointEditing;
    } else if (hovering) {
      pointStyle = style.pointHovering;
    } else if (highlighting) {
      pointStyle = style.pointHighlighting;
    }
    
    return crossing ? {
      ...pointStyle,
      lineColor: pointStyle.crossingLineColor,
      fillColor: pointStyle.crossingFillColor
    } : pointStyle;
  }
  
  private getDrawStyleFill(): IMarkingStyleFillResolved {
    const {
      style,
      stats: {
        highlighting,
        hovering,
        editing,
        crossing
      }
    } = this;
    let fillStyle = style.fill;
    
    if (editing) {
      fillStyle = style.fillEditing;
    } else if (hovering) {
      fillStyle = style.fillHovering;
    } else if (highlighting) {
      fillStyle = style.fillHighlighting;
    }
    
    return crossing ? {
      ...fillStyle,
      color: fillStyle.crossingColor
    } : fillStyle;
  }
  
  /**
   * 根据状态获取 path
   */
  private getPathForDraw(): Path {
    const {
      options,
      canvasMarking: {
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
      canvasMarking: {
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
    const area = pathArea(pathForDraw);
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
      id: this.id,
      data: this.data,
      path: _cloneDeep(path), // 得到一个干净的，从而避免引用干扰（尤其是 immer 这种会锁对象的）
      styleConfig: options.styleConfig || null,
      perimeter: pathPerimeter(pathForDraw),
      area,
      areaPercentage: area * 100 / (imageSize[0] * imageSize[1]),
      creatingWillFinish,
      hovering,
      hoveringPointIndex,
      hoveringInsertionPointIndex,
      hoveringBorderIndex: !hovering || hoveringPointIndex >= 0 || hoveringInsertionPointIndex >= 0 ? -1 : this.hoveringBorderIndex,
      highlighting: this.highlighting,
      highlightingBorderIndex: this.highlightingBorderIndex,
      editable: this.editable,
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
    return this.creating || this.creatingWait || this.editing || (this.hovering && this.editable === true) || this.path.length === 1;
  }
  
  private drawArea(): void {
    canvasDrawArea(this.canvasMarking.canvasContext, this.getPathForDraw(), {
      color: this.getDrawStyleFill().color
    });
  }
  
  private drawBorder(): void {
    const {
      canvasMarking: {
        canvasContext
      },
      options: {
        type
      },
      style: {
        borderDiff
      },
      stats: {
        creatingWillFinish,
        hoveringBorderIndex,
        highlightingBorderIndex
      }
    } = this;
    const pathForDraw = this.getPathForDraw();
    const borderStyle = this.getDrawStyleBorder();
    const close = !this.creating || creatingWillFinish === 'close' || type === 'rect' || type === 'rect2';
    const diffAll = highlightingBorderIndex !== null && highlightingBorderIndex < 0 ? borderDiff?.hover || borderDiff?.all : borderDiff?.all;
    
    this.drawPerpendicularMarks(borderStyle);
    
    canvasContext.save();
    
    this.drawBorderPartial(pathForDraw, mergeBorderStyleWithDiff(borderStyle, diffAll), close);
    
    const segmentList = pathSegmentList(pathForDraw);
    
    // 处理 borderDiff
    _forEach(borderDiff, (diff, k) => {
      const segment = segmentList[Number(k)];
      
      if (!segment || !diff) {
        return;
      }
      
      const mergedStyle = mergeBorderStyleWithDiff(borderStyle, diff);
      
      if (mergedStyle !== borderStyle) {
        this.drawBorderPartial(segment, mergedStyle);
      }
    });
    
    // 单根边样式 diff
    const hoveringBorder = hoveringBorderIndex >= 0 ? segmentList[hoveringBorderIndex] : undefined;
    const mergedStyleHover = mergeBorderStyleWithDiff(borderStyle, borderDiff?.hover);
    
    if (hoveringBorder && mergedStyleHover !== borderStyle) {
      this.drawBorderPartial(hoveringBorder, mergedStyleHover);
    }
    
    // 高亮
    if (highlightingBorderIndex !== null && highlightingBorderIndex >= 0 && highlightingBorderIndex !== hoveringBorderIndex) {
      const highlightingBorder = segmentList[highlightingBorderIndex];
      const mergedStyleHighlighting = mergeBorderStyleWithDiff(borderStyle, borderDiff?.hover);
      
      if (highlightingBorder && mergedStyleHighlighting !== borderStyle) {
        this.drawBorderPartial(highlightingBorder, mergedStyleHighlighting);
      }
    }
  }
  
  private drawBorderPartial(path: Path, borderStyle: TMarkingStyleBorderResolved, close?: boolean): void {
    const {
      canvasMarking: {
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
      shadowColor: borderStyle.shadowColor,
      shadowBlur: borderStyle.shadowBlur,
      shadowOffsetX: borderStyle.shadowOffsetX,
      shadowOffsetY: borderStyle.shadowOffsetY,
      close
    });
  }
  
  private drawPerpendicularMarks(borderStyle: TMarkingStyleBorderResolved): void {
    if (!this.creating && !(this.draggingPointIndex >= 0 && this.draggingMoved)) {
      return;
    }
    
    const {
      canvasMarking: {
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
    
    this.drawPointsInsertion(pointStyle); // 先画虚点，避免实点距离过近的时候的显示问题
    this.drawPointsVertex(pointStyle);
  }
  
  private drawPointsInsertion(pointStyle: TMarkingStylePointResolved): void {
    const {
      canvasMarking: {
        canvasContext,
        imageScale
      },
      insertionPoints
    } = this;
    
    if (!insertionPoints.length) {
      return;
    }
    
    const drawShapeOptions = {
      type: pointStyle.typeMiddle,
      radius: pointStyle.radiusMiddle / imageScale,
      // 注意这里会调换顺序
      lineWidth: pointStyle.lineWidth * 0.75 / imageScale,
      lineColor: pointStyle.fillColor,
      fillColor: pointStyle.lineColor
    };
    
    insertionPoints.forEach(v => {
      if (!v) {
        return;
      }
      
      canvasDrawPointShape(canvasContext, v, drawShapeOptions);
    });
  }
  
  private drawPointsVertex(pointStyle: TMarkingStylePointResolved): void {
    const {
      canvasMarking: {
        canvasContext,
        imageScale
      },
      statsSnapshot
    } = this;
    
    const drawShapeOptions = {
      type: pointStyle.type,
      radius: pointStyle.radius / imageScale,
      lineWidth: pointStyle.lineWidth / imageScale,
      lineColor: pointStyle.lineColor,
      fillColor: pointStyle.fillColor
    };
    const drawShapeOptionsEnlarged = {
      ...drawShapeOptions,
      radius: pointStyle.radius * (1 + pointStyle.radiusEnlargeWhenClose) / imageScale
    };
    let image: HTMLImageElement | undefined;
    let imageAspectRatio = 0;
    
    if (pointStyle.type instanceof Image) {
      image = pointStyle.type;
      
      imageAspectRatio = image.naturalWidth / image.naturalHeight;
    }
    
    this.getPathForDraw().forEach((v, i) => {
      if (image) {
        canvasContext.drawImage(image, v[0] - drawShapeOptions.radius, v[1] - drawShapeOptions.radius / imageAspectRatio, drawShapeOptions.radius * 2, drawShapeOptions.radius * 2 / imageAspectRatio);
      } else {
        canvasDrawPointShape(canvasContext, v, i === 0 && statsSnapshot.creatingWillFinish === 'close' ? drawShapeOptionsEnlarged : drawShapeOptions);
      }
    });
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
  
  /**
   * 新建或编辑完成之前执行回调，若回调返回 false 则取消，可以提供 data 或修改 path
   */
  private async beforeCreateComplete(onCreateCompletePre?: IMarkingEvents<T>['onCreateCompletePre']): Promise<boolean> {
    this.creating = false;
    
    if (onCreateCompletePre) {
      this.creatingWait = true;
      
      try {
        const result = await onCreateCompletePre(this.refreshStats(), this.canvasMarking.statsSnapshot);
        
        if (result === false) {
          this.refreshStats();
          
          return false;
        }
        
        if (result?.path) {
          this.path = result.path;
        }
        
        if (result?.data) {
          this.data = result.data;
        }
      } finally {
        this.creatingWait = false;
      }
    }
    
    this.refreshStats();
    
    return true;
  }
  
  getBorderColor(): string {
    return this.style.border.color;
  }
  
  toggleHovering(value = true): void {
    if (this.editable !== 'locked') {
      this.hovering = value;
    }
  }
  
  toggleHighlighting(value = true, borderIndex: number | null = null): void {
    this.highlighting = value;
    this.highlightingBorderIndex = value ? borderIndex : null;
  }
  
  checkMouse(): EMarkingMouseStatus {
    const {
      canvasMarking: {
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
    return this.editable !== 'locked' && this.checkMouse() !== EMarkingMouseStatus.OUT;
  }
  
  select(): void {
    if (this.editing) {
      return;
    }
    
    this.editing = true;
    this.pathSnapshotEditing = _cloneDeep(this.path);
  }
  
  finishCreating(onCreateCompletePre?: IMarkingEvents<T>['onCreateCompletePre']): false | Promise<boolean> {
    if (!this.creating || this.path.length < this.pointCountRange[0] || this.stats.crossing) {
      return false;
    }
    
    return this.beforeCreateComplete(onCreateCompletePre);
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
  
  pushPoint(onPointPushPre?: IMarkingEvents<T>['onPointPushPre']): false | number | 'close' | 'last' {
    if (!this.creating) {
      return false;
    }
    
    const {
      canvasMarking: {
        imageMouse,
        imageScale
      },
      options,
      hoveringPointIndex,
      pointCountRange: [, max],
      stats
    } = this;
    
    if (onPointPushPre?.(imageMouse, stats, this.canvasMarking.statsSnapshot) === false) {
      return false;
    }
    
    if (hoveringPointIndex >= 0) { // 在已有的点上
      return stats.creatingWillFinish === 'close' ? 'close' : false;
    }
    
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
    
    return last ? 'last' : this.path.length;
  }
  
  removePoint(): number {
    return this.creating ? this.removePointCreating() : this.removePointEditing();
  }
  
  startDragging(): boolean {
    const {
      canvasMarking: {
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
      canvasMarking: {
        imageSize,
        imageMouse
      },
      draggingPointIndex,
      draggingInsertionPointIndex,
      draggingStartCoords
    } = this;
    
    this.draggingMoved = true;
    
    if (draggingPointIndex >= 0) { // 拖动单个顶点
      this.path.splice(draggingPointIndex, 1, [imageMouse[0], imageMouse[1]]);
      
      return true;
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
  
  finishDragging(onEditDragEndPre?: IMarkingEvents<T>['onEditDragEndPre']): boolean {
    if (!this.draggingStartCoords) {
      return false;
    }
    
    const {
      draggingMoved,
      pathSnapshotEditing
    } = this;
    
    this.clearDragging();
    
    if (draggingMoved) {
      const result = onEditDragEndPre?.(this.refreshStats(), this.canvasMarking.statsSnapshot);
      
      if (result === false) {
        this.path = _cloneDeep(pathSnapshotEditing);
        
        this.refreshStats();
      } else if (result) {
        if (result?.path) {
          this.path = result.path;
        }
        
        if (result?.data) {
          this.data = result.data;
        }
        
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
    if (faded) {
      this.canvasMarking.canvasContext.globalAlpha = 0.37;
    }
    
    this.drawArea();
    this.drawBorder();
    this.drawPoints();
    
    if (faded) {
      this.canvasMarking.canvasContext.globalAlpha = 1;
    }
  }
  
  get stats(): IMarkingItemStats<T> {
    return this.statsSnapshot;
  }
}
