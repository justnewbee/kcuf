import {
  IMarkingStageClass,
  IMarkingStageStats,
  IMarkingPlugin
} from '../../types';

/**
 * 为 magnet 添加快捷键，以临时解除磁吸效果
 */
export default function pluginMagnet<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  let inCanvas = false;
  
  function handleKeydown(e: KeyboardEvent): void {
    if (inCanvas && e.key === 'Alt') {
      markingStage.toggleMagnet(false);
    }
  }
  
  function handleKeyup(e: KeyboardEvent): void {
    if (e.key === 'Alt') {
      markingStage.toggleMagnet(true);
    }
  }
  
  document.addEventListener('keydown', handleKeydown, true);
  document.addEventListener('keyup', handleKeyup, true);
  
  return {
    run(stats: IMarkingStageStats<T>): void {
      inCanvas = !!stats.mouseInCanvas;
    },
    cleanup() {
      document.removeEventListener('keydown', handleKeydown, true);
      document.removeEventListener('keyup', handleKeyup, true);
    }
  };
}