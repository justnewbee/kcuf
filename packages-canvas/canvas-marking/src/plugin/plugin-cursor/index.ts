import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';

function getCursorByStats(stats: IMarkingStats): string {
  if (stats.movingInfo.started) {
    return 'move';
  }
  
  if (stats.editingDraggingPointIndex >= 0 || stats.editingDraggingInsertionPointIndex >= 0) {
    return stats.itemStatsSelected?.path.length === 1 ? 'grabbing' : 'crosshair';
  }
  
  if (stats.hoveringPointIndex >= 0 || stats.hoveringInsertionPointIndex >= 0) {
    return stats.itemStatsHovering?.path.length === 1 ? 'grab' : 'crosshair';
  }
  
  if (stats.hovering) {
    return 'grab';
  }
  
  if (stats.editingDragging) {
    return 'grabbing';
  }
  
  return 'default';
}

/**
 * 根据状态调整光标形状
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
 */
export default function pluginCursor<T>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    canvas
  } = canvasMarking;
  
  return {
    run(stats: IMarkingStats<T>): void {
      canvas.style.cursor = getCursorByStats(stats);
    }
  };
}
