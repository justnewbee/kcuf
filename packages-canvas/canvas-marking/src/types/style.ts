export type TPointType = 'square' | 'circle';

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
export type TLineJoin = 'round' | 'bevel' | 'miter'; // 默认 round
// // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
// export type TLineCap = 'butt' | 'round' | 'square'; // 默认 butt

/**
 * 边框样式
 */
export interface IMarkingBorderStyle {
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
 * 标注区域填充样式
 *
 * 色值若为 number 表示根据 border 颜色走，取值范围 [0, 1]
 */
export interface IMarkingFillStyle {
  color?: number | string;
  crossingColor?: number | string;
}

/**
 * 标注端点的样式
 */
export interface IMarkingPointStyle {
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

export type TMarkingBorderStyleResolved = Required<Omit<IMarkingBorderStyle, 'outerColor' | 'crossingOuterColor'>> & {
  outerColor: string;
  crossingOuterColor: string;
};
export type TMarkingPointStyleResolved = Required<IMarkingPointStyle>;
export interface TMarkingFillStyleResolved {
  color: string;
  crossingColor: string;
}

/**
 * 如果有特殊的边需要特殊的样式，可以用这个
 */
export interface IMarkingBorderStyleDiff {
  color?: string;
  width?: number;
  outerColor?: string;
  outerWidth?: number;
  noInsertion?: boolean;
}
