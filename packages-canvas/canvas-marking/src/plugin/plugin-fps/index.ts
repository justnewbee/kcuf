import {
  IMarkingStageClass,
  IMarkingPlugin
} from '../../types';

import {
  BAR_HEIGHT
} from './const';
import {
  createFpsElements
} from './util';

/**
 * 在 stage 左上角展示 FTP，仅用于开发时
 */
export default function pluginFps<T>(markingStage: IMarkingStageClass<T>): IMarkingPlugin<T> {
  const {
    stage
  } = markingStage;
  const [divFps, divFpsText, divFpsGraph] = createFpsElements(stage);
  let timeLast = Date.now();
  let frames = 0;
  let rafHandle: number | undefined;
  let fpsMin = Infinity;
  let fpsMax = 0;
  
  function updateFps(): void {
    const time = Date.now();
    
    frames++;
    
    if (time > timeLast + 1000) {
      const fps = Math.round((frames * 1000) / (time - timeLast));
      
      fpsMin = Math.min(fpsMin, fps);
      fpsMax = Math.max(fpsMax, fps);
      divFpsText.innerHTML = `${fps} FPS (${fpsMin}-${fpsMax})`;
      
      const firstBar = divFpsGraph.firstChild as HTMLSpanElement | null;
      
      if (firstBar) {
        divFpsGraph.appendChild(firstBar);
        
        firstBar.style.height = `${Math.min(BAR_HEIGHT, BAR_HEIGHT - (fps / 100) * BAR_HEIGHT)}px`;
      }
      
      timeLast = time;
      frames = 0;
    }
    
    rafHandle = requestAnimationFrame(updateFps);
  }
  
  requestAnimationFrame(updateFps);
  
  return {
    cleanup(): void {
      stage.removeChild(divFps);
      
      if (rafHandle) {
        cancelAnimationFrame(rafHandle);
        
        rafHandle = undefined;
      }
    }
  };
}
