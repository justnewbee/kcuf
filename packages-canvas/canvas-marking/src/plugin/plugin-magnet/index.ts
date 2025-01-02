import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

const KEY = 'Alt';

/**
 * 按住 Alt 键以临时解除磁吸效果
 */
export default function pluginMagnet<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === KEY) {
      canvasMarking.toggleJustify(false);
    }
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === KEY) {
      canvasMarking.toggleJustify(true);
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
