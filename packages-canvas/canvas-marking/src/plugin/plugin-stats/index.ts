import {
  EMarkingStatsChangeCause
} from '../../enum';
import {
  ICanvasMarkingClass,
  ICanvasMarkingStats,
  IMarkingPlugin
} from '../../types';

import {
  createStatsElements,
  getStatsDisplayHtml
} from './util';

/**
 * 在 stage 右侧展示当前的标注状态，开发时很有用
 */
export default function pluginStats<T>(markingStage: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    stage
  } = markingStage;
  
  let statsElement: HTMLDivElement | null;
  
  function showStats(stats: ICanvasMarkingStats<T>, cause: EMarkingStatsChangeCause): void {
    if (!statsElement) {
      statsElement = createStatsElements(stage);
    }
    
    statsElement.innerHTML = getStatsDisplayHtml(stats, cause);
  }
  
  return {
    run(stats: ICanvasMarkingStats<T>, cause: EMarkingStatsChangeCause): void {
      showStats(stats, cause);
    },
    cleanup(): void {
      if (statsElement) {
        stage.removeChild(statsElement);
      }
      
      statsElement = null;
    }
  };
}
