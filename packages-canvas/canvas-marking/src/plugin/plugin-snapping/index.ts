import {
  bindEventToDocument
} from '@kcuf/mere-dom';

import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';

const KEY = 'Shift';

/**
 * 需按住 Shift 已启用 snapping 效果
 */
export default function pluginSnapping<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindEventToDocument('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === KEY) {
      canvasMarking.toggleSnap(true);
    }
  }, true);
  const unbindDocKeyup = bindEventToDocument('keyup', (e: KeyboardEvent): void => {
    if (e.key === KEY) {
      canvasMarking.toggleSnap(false);
    }
  }, true);
  
  return {
    run(stats: IMarkingStats<T>): void {
      inCanvas = !!stats.mouseInfo.coordsInCanvas;
    },
    cleanup(): void {
      unbindDocKeydown();
      unbindDocKeyup();
    }
  };
}
