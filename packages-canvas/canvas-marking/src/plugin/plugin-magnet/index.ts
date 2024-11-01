import {
  IMarkingStageClass,
  IMarkingStageStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

const KEY = 'Alt';

/**
 * 按住 Alt 键以临时解除磁吸效果
 */
export default function pluginMagnet<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === KEY) {
      markingStage.toggleJustify(false);
    }
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === KEY) {
      markingStage.toggleJustify(true);
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