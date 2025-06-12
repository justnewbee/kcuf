import {
  Point,
  Path
} from '@kcuf/geometry-basic';

import {
  TCreatingWillFinish,
  ISimpleRect,
  IImageInfo, IMouseInfo
} from './common';
import {
  ICommonNoActionOptions
} from './options-common';
import {
  IMarkingStyleConfig
} from './style';

/**
 * 单个标记的实时统计信息（注意，并不记录创建中的）
 */
export interface IMarkingItemStats<T = unknown> extends Required<ICommonNoActionOptions> {
  id: string;
  data?: T; // 附加数据，可以添加你需要的任何数据
  path: Path;
  styleConfig: IMarkingStyleConfig | null;
  perimeter: number; // 所有边总长 px
  area: number; // 面积，px²
  areaPercentage: number; // 面积占比，取值范围 [0, 100]，可直接拼 % 展示
  /**
   * 是否即将完成绘制
   *
   * - false 不是
   * - true 下一个点最末一个点
   * - close 路径闭合
   */
  creatingWillFinish: TCreatingWillFinish;
  hovering: boolean;
  hoveringPointIndex: number;
  hoveringInsertionPointIndex: number;
  hoveringBorderIndex: number;
  highlighting: boolean;
  highlightingBorderIndex: number | null;
  editing: boolean;
  dirty: boolean;
  crossing: boolean;
  dragging: boolean;
  draggingMoved: boolean;
  draggingPointIndex: number;
  draggingInsertionPointIndex: number;
}

/**
 * 整体实时统计信息
 */
export interface IMarkingStats<T = unknown> {
  zoom: number;
  stageRect: ISimpleRect; // 相对于 document，浏览器缩放会影响
  canvasRect: ISimpleRect; // 相对于 stage
  imageInfo: IImageInfo;
  mouseInfo: IMouseInfo;
  mouseDownCanvas: boolean;
  mouseDownMoving: boolean;
  moving: boolean;
  movingCoordsStart: Point | null;
  movingCoords: Point;
  // 与 MarkingItem 有关状态
  itemStatsList: IMarkingItemStats<T>[];
  itemStatsCreating: IMarkingItemStats<T> | null;
  itemStatsHovering: IMarkingItemStats<T> | null;
  itemStatsHighlighting: IMarkingItemStats<T> | null;
  itemStatsSelected: IMarkingItemStats<T> | null;
  // 根据 MarkingItemStats 计算得出的结果
  creating: boolean;
  creatingStarted: boolean;
  creatingCrossing: boolean;
  creatingWillFinish: TCreatingWillFinish;
  highlighting: boolean;
  hovering: boolean;
  hoveringPoint: Point | null;
  hoveringPointIndex: number;
  hoveringInsertionPointIndex: number;
  hoveringBorderIndex: number;
  editing: boolean;
  editingPathLength: number;
  editingDirty: boolean;
  editingCrossing: boolean;
  editingHovering: boolean;
  editingHoveringPointIndex: number;
  editingHoveringInsertionPointIndex: number;
  editingHoveringBorderIndex: number;
  editingDragging: boolean;
  editingDraggingPointIndex: number;
  editingDraggingInsertionPointIndex: number;
}
