export type TPointShape = 'cross' | 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'diamond' | 'star' | HTMLImageElement;

/**
 * 标注端点的样式
 */
export interface IMarkingStylePoint {
  /**
   * 端点类型，默认 `square`
   */
  shape?: TPointShape;
  /**
   * 端点间中点类型，默认 `circle`
   */
  shapeMiddle?: Exclude<TPointShape, HTMLImageElement>;
  /**
   * 半径（或半边长）
   */
  radius?: number;
  radiusMiddle?: number;
  /**
   * 自动闭合时的扩大比例（会加上 `1`），默认 `0.66`
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

export type TMarkingStylePointResolved = Required<IMarkingStylePoint>;
