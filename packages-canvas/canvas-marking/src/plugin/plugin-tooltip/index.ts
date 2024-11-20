import {
  ICanvasMarkingClass,
  ICanvasMarkingStats,
  IMarkingPlugin,
  IMarkingPluginTooltipOptions
} from '../../types';

import {
  createTooltipElement,
  getTooltipMessage
} from './util';

const BOTTOM_SPACING = 80;

/**
 * 根据状态在鼠标处增加用户提示
 */
export default function pluginTooltip<T>(markingStage: ICanvasMarkingClass<T>, pluginOptions: IMarkingPluginTooltipOptions<T> = {}): IMarkingPlugin<T> {
  const {
    options,
    stage
  } = markingStage;
  const {
    offsetX = 16,
    offsetY = 4
  } = pluginOptions;
  let tooltipElement: HTMLDivElement | null;
  
  function showTooltip(message: string, stats: ICanvasMarkingStats<T>): void {
    const {
      mouseInStage,
      stageSize,
      creatingCrossing,
      editingCrossing
    } = stats;
    
    if (!mouseInStage) {
      return;
    }
    
    if (!tooltipElement) {
      tooltipElement = createTooltipElement(stage);
    }
    
    tooltipElement.innerHTML = message;
    
    if (mouseInStage[0] > stageSize[0] * 2 / 3) {
      tooltipElement.style.left = 'auto';
      tooltipElement.style.right = `${stageSize[0] - mouseInStage[0] + offsetX}px`;
    } else {
      tooltipElement.style.left = `${mouseInStage[0] + offsetX}px`;
      tooltipElement.style.right = 'auto';
    }
    
    if (mouseInStage[1] > stageSize[1] - BOTTOM_SPACING) {
      tooltipElement.style.top = 'auto';
      tooltipElement.style.bottom = `${stageSize[1] - mouseInStage[1] + offsetY}px`;
    } else {
      tooltipElement.style.top = `${mouseInStage[1] + offsetY}px`;
      tooltipElement.style.bottom = 'auto';
    }
    
    tooltipElement.style.display = 'block';
    
    if (creatingCrossing || editingCrossing) {
      tooltipElement.classList.add('is-crossing');
    } else {
      tooltipElement.classList.remove('is-crossing');
    }
    
    setTimeout(() => { // setTimout for transition to work
      tooltipElement?.classList.add('is-visible');
    }, 0);
  }
  
  function hideTooltip(): void {
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
      tooltipElement.innerHTML = '';
      tooltipElement.classList.remove('is-visible');
    }
  }
  
  return {
    run(stats: ICanvasMarkingStats<T>): void {
      const message = getTooltipMessage(stats, options, pluginOptions);
      
      if (!message) {
        hideTooltip();
        
        return;
      }
      
      showTooltip(message, stats);
    },
    cleanup(): void {
      if (tooltipElement) {
        stage.removeChild(tooltipElement);
      }
      
      tooltipElement = null;
    }
  };
}
