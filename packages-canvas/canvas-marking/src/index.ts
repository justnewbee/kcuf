export { CanvasMarking as default } from './class';

export * from './plugin';
export {
  uuid
} from './util';

export {
  EZoomHow as ZoomHow,
  EMarkingStatsChangeCause as MarkingStatsChangeCause
} from './enum';

export type {
  Point,
  Path,
  Segment
} from '@kcuf/geometry-basic';

export type {
  TSubscribableEvents as SubscribableEvents,
  TEditable as Editable,
  
  ICanvasMarkingClass as CanvasMarkingClassType,
  
  IMarkingStats as MarkingStats,
  IMarkingItemStats as MarkingItemStats,
  IMarkingEvents as MarkingEvents,
  IMarkingItemConfig as MarkingItemConfig,
  TMarkingItemFinder as MarkingItemFinder,
  
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
