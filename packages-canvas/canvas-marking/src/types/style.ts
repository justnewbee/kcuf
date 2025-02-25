import {
  IMarkingStylePoint,
  TMarkingStylePointResolved
} from './style-point';
import {
  IMarkingStyleBorder,
  IMarkingStyleConfigBorderDiff,
  TMarkingStyleBorderResolved
} from './style-border';
import {
  IMarkingStyleFill,
  IMarkingStyleFillResolved
} from './style-fill';

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
