import {
  ICanvasMarkingStats,
  IMarkingPluginTooltipOptions
} from '../../../types';

export default function getTooltipMessageExtra<T>(stats: ICanvasMarkingStats<T>, pluginOptions: IMarkingPluginTooltipOptions<T>): string | undefined {
  const {
    itemStatsCreating,
    itemStatsHovering
  } = stats;
  
  if (stats.moving) {
    return '';
  }
  
  if (stats.creatingCrossing || stats.editingCrossing) {
    return '检测到路径有交叉或重叠，将无法保存';
  }
  
  if (itemStatsCreating) {
    return pluginOptions.getCreatingInfo?.(itemStatsCreating);
  }
  
  if (itemStatsHovering) {
    return pluginOptions.getHoveringInfo?.(itemStatsHovering);
  }
}
