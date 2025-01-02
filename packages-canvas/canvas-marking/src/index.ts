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
  
  IMarkingStats as MarkingStats,
  IMarkingItemStats as MarkingItemStats,
  IMarkingEvents as MarkingEvents,
  IMarkingItemConfig as MarkingItemConfig,
  TMarkingItemFinder as MarkingItemFinder,
  
  TSubscribableEvents as SubscribableEvents,
  
  ICanvasMarkingOptions as CanvasMarkingOptions,
  TZoomArg as ZoomArg,
  IZoomOptions as ZoomOptions,
  ITooltipOptions as TooltipOptions,
  
  ICreateCompletePreResult as CreateCompletePreResult,
  IEditDragEndPreResult as EditDragEndPreResult,
  
  IMarkingConfigItem as MarkingConfigItem,
  IMarkingStyleConfigBorderDiff as MarkingConfigItemBorderDiff,
  
  IMarkingStyleConfig as MarkingStyleConfig,
  IMarkingStyleBorder as MarkingStyleBorder,
  IMarkingStyleBorderDiff as MarkingStyleBorderDiff,
  IMarkingStylePoint as MarkingStylePoint,
  IMarkingStyleFill as MarkingStyleFill
} from './types';
