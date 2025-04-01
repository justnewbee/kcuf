import {
  EZoomHow
} from '../../enum';
import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

/**
 * 为 zoom 添加快捷键
 */
export default function pluginZoom<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  let willZoom = false;
  
  function zoomOnKey(key: string, shift: boolean): boolean {
    switch (key) { // TODO 是不是有个 100%
    case '=': // +
      shift ? canvasMarking.zoom(EZoomHow.MAX) : canvasMarking.zoom(EZoomHow.IN);
      
      return true;
    case '-':
      shift ? canvasMarking.zoom(EZoomHow.MIN) : canvasMarking.zoom(EZoomHow.OUT);
      
      return true;
    case '0':
      canvasMarking.zoom(EZoomHow.RESET);
      
      return false; // CMD 0 可以消除 pinch 的放大效果
    default:
      return false;
    }
  }
  
  function handleKeydown(e: KeyboardEvent): void {
    if (!willZoom || !(e.metaKey || e.ctrlKey)) {
      return;
    }
    
    if (zoomOnKey(e.key, e.shiftKey)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  
  function handleWheel(e: WheelEvent): void {
    if (!willZoom) {
      return;
    }
    
    e.stopPropagation();
    e.preventDefault();
    
    if (e.deltaY > 0) {
      canvasMarking.zoom(EZoomHow.OUT, true);
    } else {
      canvasMarking.zoom(EZoomHow.IN, true);
    }
  }
  
  const unbindDocKeydown = bindDocumentEvent('keydown', handleKeydown, true);
  const unbindDocWheel = bindDocumentEvent('wheel', handleWheel, {
    capture: true,
    passive: false // 否则 Chrome 会 console.error 出一堆恶心的提示「[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.」
  });
  
  return {
    run(stats: IMarkingStats<T>): void {
      willZoom = !!stats.mouseInStage && !stats.moving;
    },
    cleanup(): void {
      unbindDocKeydown();
      unbindDocWheel();
    }
  };
}
