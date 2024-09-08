export { MarkingStage as default } from './class';

export {
  EMarkingStatsChangeCause as MarkingStatsChangeCause
} from './enum';

export type {
  Path
} from '@kcuf/geometry-basic';

export type {
  IMarkingStageClass as MarkingStageClassType,
  TMarkingItemFinder as MarkingItemFinder,
  
  IMarkingConfigItemBorderDiff as MarkingConfigItemBorderDiff,
  
  IMarkingBorderStyle as MarkingBorderStyle,
  IMarkingBorderStyleDiff as MarkingBorderStyleDiff,
  IMarkingFillStyle as MarkingFillStyle,
  IMarkingPointStyle as MarkingPointStyle,
  
  IMarkingStageStats as MarkingStageStats,
  IMarkingItemStats as MarkingItemStats,
  
  IMarkingConfigItem as MarkingConfigItem,
  IMarkingItemConfig as MarkingItemConfig,
  IMarkingStageOptions as MarkingStageOptions,
  IMarkingPluginTooltipOptions as MarkingPluginTooltipOptions
} from './types';