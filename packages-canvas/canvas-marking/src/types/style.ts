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
  borderHover?: IMarkingStyleBorder;
  borderHighlight?: IMarkingStyleBorder;
  borderSelect?: IMarkingStyleBorder;
  point?: IMarkingStylePoint;
  pointHover?: IMarkingStylePoint;
  pointHighlight?: IMarkingStylePoint;
  pointSelect?: IMarkingStylePoint;
  fill?: IMarkingStyleFill;
  fillHover?: IMarkingStyleFill;
  fillHighlight?: IMarkingStyleFill;
  fillSelect?: IMarkingStyleFill;
  /**
   * 针对第 n 边（起点为第 n 个点）做特定的设置
   */
  borderDiff?: IMarkingStyleConfigBorderDiff;
}

export interface IMarkingStyleConfigResolved {
  border: TMarkingStyleBorderResolved;
  borderHover: TMarkingStyleBorderResolved;
  borderHighlight: TMarkingStyleBorderResolved;
  borderSelect: TMarkingStyleBorderResolved;
  
  point: TMarkingStylePointResolved;
  pointHover: TMarkingStylePointResolved;
  pointHighlight: TMarkingStylePointResolved;
  pointSelect: TMarkingStylePointResolved;
  
  fill: IMarkingStyleFillResolved;
  fillHover: IMarkingStyleFillResolved;
  fillHighlight: IMarkingStyleFillResolved;
  fillSelect: IMarkingStyleFillResolved;
  
  borderDiff?: IMarkingStyleConfigBorderDiff;
}
