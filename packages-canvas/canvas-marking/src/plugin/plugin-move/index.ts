import {
  ICanvasMarkingClass,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

/**
 * 让画布移动，使用 transform，从而不会使内部坐标等受到影响
 */
export default function pluginMove<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    stage,
    canvas
  } = canvasMarking;
  
  canvas.addEventListener('mousedown', () => canvasMarking.moveStart()); // 在 canvas 上落鼠标
  stage.addEventListener('mousemove', () => canvasMarking.moveProcess()); // 在 stage 上移动鼠标
  
  const unbindDocKeydown = bindDocumentEvent('keydown', (e: KeyboardEvent): void => { // 可能会移到外部，需要能够在外部结束
    const {
      mouseInStage
    } = canvasMarking.getStats();
    
    if (!mouseInStage || e.key !== ' ') {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    canvasMarking.moveReady();
  }, true);
  const unbindDocKeyup = bindDocumentEvent('keyup', (e: KeyboardEvent): void => {
    if (e.key === ' ') {
      canvasMarking.moveEnd();
    }
  }, true);
  const unbindDocMouseup = bindDocumentEvent('mouseup', () => canvasMarking.movePause(), true); // 在 document 上收鼠标
  
  return {
    cleanup(): void {
      unbindDocKeydown();
      unbindDocKeyup();
      unbindDocMouseup();
    }
  };
}
