export type TPointType = 'square' | 'circle';

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
export type TLineJoin = 'round' | 'bevel' | 'miter'; // 默认 round
// // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
// export type TLineCap = 'butt' | 'round' | 'square'; // 默认 butt

/**
 * 边框样式
 */
export interface IMarkingStyleBorder {
  lineJoin?: TLineJoin;
  /**
   * 连线宽度
   */
  width?: number;
  /**
   * 连线色
   */
  color?: string;
  /**
   * 连线包边宽度（注意是比 width 大多少的部分除以 2，并不是实际宽度），当 outerWidth > 0 且 outerColor ≠ color 的时候，
   * 会渲染一条带边框的线
   */
  outerWidth?: number;
  /**
   * 连线包边色，若是数值 [0, 1] 则表示使用 color 设置 + alpha 透明度
   */
  outerColor?: string | number;
  // 检测到交叉时的颜色设置
  crossingColor?: string;
  crossingOuterColor?: string | number;
}

/**
 * 如果有特殊的边需要特殊的样式，可以用这个
 */
export interface IMarkingStyleBorderDiff {
  color?: string;
  width?: number;
  outerColor?: string;
  outerWidth?: number;
  noInsertion?: boolean;
}

/**
 * 标注端点的样式
 */
export interface IMarkingStylePoint {
  /**
   * 端点类型，默认 square，不建议改
   */
  type?: TPointType;
  /**
   * 端点间中点类型，默认 circle，不建议改
   */
  typeMiddle?: TPointType;
  /**
   * 半径（或半边长）
   */
  radius?: number;
  /**
   * 自动闭合时的扩大比例（会加上 1），默认 0.5
   */
  radiusEnlargeWhenClose?: number;
  /**
   * 边框宽度
   */
  lineWidth?: number;
  /**
   * 边框色（不设则继承边框色）
   */
  lineColor?: string;
  /**
   * 填充色
   */
  fillColor?: string;
  // 检测到交叉时的颜色设置
  crossingLineColor?: string;
  crossingFillColor?: string;
}

/**
 * 标注区域填充样式
 *
 * 色值若为 number 表示根据 border 颜色走，取值范围 [0, 1]
 */
export interface IMarkingStyleFill {
  color?: number | string;
  crossingColor?: number | string;
}

export type TMarkingStyleBorderResolved = Required<Omit<IMarkingStyleBorder, 'outerColor' | 'crossingOuterColor'>> & {
  outerColor: string;
  crossingOuterColor: string;
};

export interface IMarkingStyleFillResolved {
  color: string;
  crossingColor: string;
}

export type TMarkingStylePointResolved = Required<IMarkingStylePoint>;

/**
 * 辅助线样式
 */
export interface IMarkingStyleAuxiliary {
  /**
   * 辅助线宽度
   */
  width?: number;
  /**
   * 辅助线颜色
   */
  color?: string;
}

export interface IMarkingStyleConfigBorderDiff {
  all?: IMarkingStyleBorderDiff;
  hover?: IMarkingStyleBorderDiff; // 复用于 highlight
  [index: number]: IMarkingStyleBorderDiff;
}

/**
 * 样式配置
 */
export interface IMarkingStyleConfig {
  border?: IMarkingStyleBorder;
  borderHovering?: IMarkingStyleBorder;
  borderHighlighting?: IMarkingStyleBorder;
  borderEditing?: IMarkingStyleBorder;
  point?: IMarkingStylePoint;
  pointHovering?: IMarkingStylePoint;
  pointHighlighting?: IMarkingStylePoint;
  pointEditing?: IMarkingStylePoint;
  fill?: IMarkingStyleFill;
  fillHovering?: IMarkingStyleFill;
  fillHighlighting?: IMarkingStyleFill;
  fillEditing?: IMarkingStyleFill;
  /**
   * 针对第 n 边（起点为第 n 个点）做特定的设置
   */
  borderDiff?: IMarkingStyleConfigBorderDiff;
}

export interface IMarkingStyleConfigResolved {
  border: TMarkingStyleBorderResolved;
  borderHovering: TMarkingStyleBorderResolved;
  borderHighlighting: TMarkingStyleBorderResolved;
  borderEditing: TMarkingStyleBorderResolved;
  
  point: TMarkingStylePointResolved;
  pointHovering: TMarkingStylePointResolved;
  pointHighlighting: TMarkingStylePointResolved;
  pointEditing: TMarkingStylePointResolved;
  
  fill: IMarkingStyleFillResolved;
  fillHovering: IMarkingStyleFillResolved;
  fillHighlighting: IMarkingStyleFillResolved;
  fillEditing: IMarkingStyleFillResolved;
  
  borderDiff?: IMarkingStyleConfigBorderDiff;
}

export interface IMarkingBehaviorConfig {
  /**
   * 路径支持最少点数，若完成绘制时，不满足此值，视为取消
   *
   * 取值：
   *
   * - 默认 → 3
   * - 小于 2 → 3，因为一个点毫无意义
   * - 2 → 将允许线段
   * - 大于等于 3 → 只允许平面（不允许线段）
   */
  pointCountMin?: number;
  /**
   * 路径支持最多点数，若到达此值，则自动完成绘制
   *
   * 取值：
   *
   * - 0 / -1 → 不限制上限
   * - 小于等于 pointCountMin，将限制为 pointCountMin，即只能 n 个边
   * - 其他，有上限
   */
  pointCountMax?: number;
  // 💥 以下不允许在 new MarkingItem 的时候进行修改
  /**
   * 插入点在两个端点距离（视觉值，并非实际值）小于此值时，不显示
   */
  pointInsertionMinDistance?: number;
  /**
   * 是否禁用（默认不禁）在端点中间加入插入点
   *
   * - false：默认，可插
   * - true：不可插
   */
  noPointInsertion?: boolean;
  /**
   * 是否禁用（默认不禁）交叉检测
   *
   * - false：默认，若交叉，将不允许完成新建和编辑
   * - true：允许交叉
   */
  noCrossingDetection?: boolean;
  /**
   * 是否禁用（默认不禁）拖动整体
   *
   * - false：默认，可拖路径整体
   * - true：无法拖路径整体，但还可以拖动节点
   */
  noDragWhole?: boolean;
}
