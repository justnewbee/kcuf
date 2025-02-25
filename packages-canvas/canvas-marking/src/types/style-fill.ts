/**
 * 标注区域填充样式
 *
 * 色值若为 `number` 表示根据 `border` 颜色走，取值范围 [0, 100]
 */
export interface IMarkingStyleFill {
  color?: number | string;
  crossingColor?: number | string;
}

export interface IMarkingStyleFillResolved {
  color: string;
  crossingColor: string;
}
