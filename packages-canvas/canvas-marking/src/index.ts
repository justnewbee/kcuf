export { CanvasMarking as default } from './class';

export * from './plugin';

export {
  EZoomHow as ZoomHow,
  EMarkingStatsChangeCause as MarkingStatsChangeCause
} from './enum';

export type {
  Path
} from '@kcuf/geometry-basic';

export type {
  ICanvasMarkingClass as CanvasMarkingClassType,
  ICanvasMarkingStats as CanvasMarkingStats,
  
  IMarkingItemStats as MarkingItemStats,
  IMarkingItemConfig as MarkingItemConfig,
  TMarkingItemFinder as MarkingItemFinder,
  
  IMarkingConfigItem as MarkingConfigItem,
  IMarkingConfigItemBorderDiff as MarkingConfigItemBorderDiff,
  
  IMarkingBorderStyle as MarkingBorderStyle,
  IMarkingBorderStyleDiff as MarkingBorderStyleDiff,
  IMarkingFillStyle as MarkingFillStyle,
  IMarkingPointStyle as MarkingPointStyle,
  
  IMarkingZoomOptions as MarkingZoomOptions,
  IMarkingTooltipOptions as MarkingTooltipOptions,
  ICanvasMarkingOptions as CanvasMarkingOptions
} from './types';
