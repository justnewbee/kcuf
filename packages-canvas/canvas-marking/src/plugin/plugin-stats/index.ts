import {
  EMarkingStatsChangeCause
} from '../../enum';
import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';

import {
  createStatsElements,
  getStatsDisplayHtml
} from './util';

/**
 * 在 stage 右侧展示当前的标注状态，开发时很有用
 */
export default function pluginStats<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    stage
  } = canvasMarking;
  
  let statsElement: HTMLDivElement | null = createStatsElements(stage);
  
  statsElement.innerHTML = getStatsDisplayHtml(canvasMarking.getStats());
  
  return {
    run(stats: IMarkingStats<T>, cause: EMarkingStatsChangeCause): void {
      if (statsElement) {
        statsElement.innerHTML = getStatsDisplayHtml(stats, cause);
      }
    },
    cleanup(): void {
      if (statsElement) {
        stage.removeChild(statsElement);
      }
      
      statsElement = null;
    }
  };
}
