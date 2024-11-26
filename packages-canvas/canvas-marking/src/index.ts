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
  
  IMarkingEvents as MarkingEvents,
  IMarkingItemStats as MarkingItemStats,
  IMarkingItemConfig as MarkingItemConfig,
  TMarkingItemFinder as MarkingItemFinder,
  
  ICanvasMarkingOptions as CanvasMarkingOptions,
  TZoomArg as ZoomArg,
  IZoomOptions as ZoomOptions,
  ITooltipOptions as TooltipOptions,
  
  IBeforeCreateCompleteResult as BeforeCreateCompleteResult,
  
  IMarkingConfigItem as MarkingConfigItem,
  IMarkingConfigItemBorderDiff as MarkingConfigItemBorderDiff,
  
  IMarkingBorderStyle as MarkingBorderStyle,
  IMarkingBorderStyleDiff as MarkingBorderStyleDiff,
  IMarkingFillStyle as MarkingFillStyle,
  IMarkingPointStyle as MarkingPointStyle
} from './types';
