import {
  ICanvasMarkingOptions,
  IMarkingStats
} from '../../../types';

export default function getTooltipMessageExtra<T = unknown>(stats: IMarkingStats<T>, options: ICanvasMarkingOptions<T>): string | undefined {
  const {
    itemStatsCreating,
    itemStatsHovering
  } = stats;
  
  if (stats.creatingCrossing || stats.editingCrossing) {
    return '检测到路径有交叉或重叠，将无法保存';
  }
  
  if (itemStatsCreating) {
    return options.tooltipOptions?.getCreatingInfo?.(itemStatsCreating);
  }
  
  if (itemStatsHovering) {
    return options.tooltipOptions?.getHoveringInfo?.(itemStatsHovering);
  }
}
