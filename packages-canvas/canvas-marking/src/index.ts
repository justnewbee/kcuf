export { CanvasMarking as default } from './class';

export {
  EZoomHow as ZoomHow,
  EMarkingStatsChangeCause as MarkingStatsChangeCause
} from './enum';

export type {
  Path
} from '@kcuf/geometry-basic';

export type {
  ICanvasMarkingClass as CanvasMarkingClassType,
  TMarkingItemFinder as MarkingItemFinder,
  
  IMarkingConfigItemBorderDiff as MarkingConfigItemBorderDiff,
  
  IMarkingBorderStyle as MarkingBorderStyle,
  IMarkingBorderStyleDiff as MarkingBorderStyleDiff,
  IMarkingFillStyle as MarkingFillStyle,
  IMarkingPointStyle as MarkingPointStyle,
  
  ICanvasMarkingStats as CanvasMarkingStats,
  IMarkingItemStats as MarkingItemStats,
  
  IMarkingConfigItem as MarkingConfigItem,
  IMarkingItemConfig as MarkingItemConfig,
  ICanvasMarkingOptions as CanvasMarkingOptions,
  IMarkingPluginTooltipOptions as MarkingPluginTooltipOptions
} from './types';
