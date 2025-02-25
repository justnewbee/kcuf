// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
export type TBorderLineJoin = 'round' | 'bevel' | 'miter'; // 默认 round

// // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
// export type TBorderLineCap = 'butt' | 'round' | 'square'; // 默认 butt

/**
 * 边框样式
 */
export interface IMarkingStyleBorder {
  lineJoin?: TBorderLineJoin;
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
  // 边框影音
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
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

export type TMarkingStyleBorderResolved = Required<Omit<IMarkingStyleBorder, 'outerColor' | 'crossingOuterColor'>> & {
  outerColor: string;
  crossingOuterColor: string;
};

export interface IMarkingStyleConfigBorderDiff {
  all?: IMarkingStyleBorderDiff;
  hover?: IMarkingStyleBorderDiff; // 复用于 highlight
  [index: number]: IMarkingStyleBorderDiff;
}
