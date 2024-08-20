import {
  IMarkingStageClass,
  IMarkingStageStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

const KEY = 'Shift';

/**
 * 需按住 Shift 已启用 snapping 效果
 */
export default function pluginSnapping<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === KEY) {
      markingStage.toggleSnapping(true);
    }
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === KEY) {
      markingStage.toggleSnapping(false);
    }
  }, true);
  
  return {
    run(stats: IMarkingStageStats<T>): void {
      inCanvas = !!stats.mouseInCanvas;
    },
    cleanup() {
      unbindDocKeydown();
      unbindDocKeyup();
    }
  };
}