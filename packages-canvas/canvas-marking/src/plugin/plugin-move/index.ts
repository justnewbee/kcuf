import {
  IMarkingStageClass,
  IMarkingPlugin
} from '../../types';

/**
 * 让画布移动，使用 transform，从而不会使内部坐标等受到影响
 */
export default function pluginMove<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  const {
    stage,
    canvas
  } = markingStage;
  
  function handleDocumentKeydown(e: KeyboardEvent): void { // 可能会移到外部，需要能够在外部结束
    const {
      moving,
      mouseInStage
    } = markingStage.getStats();
    
    if (!mouseInStage || e.key !== ' ') {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    if (moving) {
      markingStage.moveEnd();
    } else {
      markingStage.moveReady();
    }
  }
  
  function handleDocumentMouseUp(): void { // 可能会移到外部，需要能够在外部结束
    markingStage.movePause();
  }
  
  canvas.addEventListener('mousedown', () => markingStage.moveStart()); // 在 canvas 上落鼠标
  
  stage.addEventListener('mousemove', () => markingStage.moveProcess()); // 在 stage 上移动鼠标
  
  document.addEventListener('keydown', handleDocumentKeydown, true);
  document.addEventListener('mouseup', handleDocumentMouseUp, true); // 在 document 上收鼠标
  
  return {
    cleanup() {
      document.addEventListener('keydown', handleDocumentKeydown, true);
      document.removeEventListener('mouseup', handleDocumentMouseUp, true);
    }
  };
}