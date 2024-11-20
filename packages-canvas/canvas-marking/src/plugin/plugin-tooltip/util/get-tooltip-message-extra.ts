import {
  ICanvasMarkingStats,
  IMarkingTooltipOptions
} from '../../../types';

export default function getTooltipMessageExtra<T = unknown>(stats: ICanvasMarkingStats<T>, pluginOptions: IMarkingTooltipOptions<T>): string | undefined {
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
