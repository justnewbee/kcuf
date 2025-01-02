import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

const KEY = 'Shift';

/**
 * 需按住 Shift 已启用 snapping 效果
 */
export default function pluginSnapping<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === KEY) {
      canvasMarking.toggleSnap(true);
    }
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === KEY) {
      canvasMarking.toggleSnap(false);
    }
  }, true);
  
  return {
    run(stats: IMarkingStats<T>): void {
      inCanvas = !!stats.mouseInCanvas;
    },
    cleanup(): void {
      unbindDocKeydown();
      unbindDocKeyup();
    }
  };
}
