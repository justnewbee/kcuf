import {
  ICanvasMarkingClass,
  ICanvasMarkingStats,
  IMarkingPlugin
} from '../../types';

/**
 * 根据状态调整光标形状
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
 */
export default function pluginCursor<T>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    options,
    canvas
  } = canvasMarking;
  
  return {
    run(stats: ICanvasMarkingStats<T>): void {
      let cursor = 'default';
      
      if (stats.moving) {
        cursor = 'move';
      } else if (stats.editingDragging) {
        cursor = 'grabbing';
      } else if (stats.editingHoveringPointIndex >= 0 || stats.editingHoveringInsertionPointIndex >= 0 || stats.editingDraggingPointIndex >= 0 || stats.editingDraggingInsertionPointIndex >= 0) {
        cursor = 'crosshair';
      } else if (stats.editingHovering && !options.noDragWhole) {
        cursor = 'grab';
      } else if (stats.hovering && stats.hoveringPointIndex < 0) {
        cursor = 'pointer';
      }
      
      canvas.style.cursor = cursor;
    }
  };
}
