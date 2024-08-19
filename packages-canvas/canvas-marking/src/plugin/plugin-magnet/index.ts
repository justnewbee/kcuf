import {
  IMarkingStageClass,
  IMarkingStageStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

/**
 * 为 magnet 添加快捷键，以临时解除磁吸效果
 */
export default function pluginMagnet<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => {
    if (inCanvas && e.key === 'Alt') {
      markingStage.toggleMagnet(false);
    }
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === 'Alt') {
      markingStage.toggleMagnet(true);
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