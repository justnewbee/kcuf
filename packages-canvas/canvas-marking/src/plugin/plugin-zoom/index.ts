import {
  IMarkingStageClass,
  IMarkingStageStats,
  IMarkingPlugin
} from '../../types';
import {
  bindDocumentEvent
} from '../../util';

/**
 * 为 zoom 添加快捷键
 */
export default function pluginZoom<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  let willZoom = false;
  
  function zoomOnKey(key: string, shift: boolean): boolean {
    switch (key) {
    case '=': // +
      shift ? markingStage.zoomMax() : markingStage.zoomIn();
        
      return true;
    case '-':
      shift ? markingStage.zoomMin() : markingStage.zoomOut();
        
      return true;
    case '0':
      markingStage.zoomReset(); // TODO 是不是有个 100%
        
      return true;
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
      markingStage.zoomOut(true);
    } else {
      markingStage.zoomIn(true);
    }
  }
  
  const unbindDocKeydown = bindDocumentEvent('keydown', handleKeydown, true);
  const unbindDocWheel = bindDocumentEvent('wheel', handleWheel, {
    capture: true,
    passive: false // 否则 Chrome 会 console.error 出一堆恶心的提示「[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.」
  });
  
  return {
    run(stats: IMarkingStageStats<T>): void {
      willZoom = !!stats.mouseInStage;
    },
    cleanup() {
      unbindDocKeydown();
      unbindDocWheel();
    }
  };
}
