import {
  ICanvasMarkingClass,
  IMarkingStats,
  IMarkingPlugin
} from '../../types';

import {
  createTooltipElement,
  getTooltipMessage
} from './util';

const BOTTOM_SPACING = 80;

/**
 * 根据状态在鼠标处增加用户提示
 */
export default function pluginTooltip<T = unknown>(canvasMarking: ICanvasMarkingClass<T>): IMarkingPlugin<T> {
  const {
    options,
    stage
  } = canvasMarking;
  let tooltipElement: HTMLDivElement | null;
  
  function showTooltip(message: string, stats: IMarkingStats<T>): void {
    const {
      stageRect: {
        size
      },
      mouseInStage,
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
    
    if (mouseInStage[0] > size[0] * 2 / 3) {
      tooltipElement.style.left = 'auto';
      tooltipElement.style.right = `${size[0] - mouseInStage[0] + (options.tooltipOptions?.offsetX ?? 16)}px`;
    } else {
      tooltipElement.style.left = `${mouseInStage[0] + (options.tooltipOptions?.offsetX ?? 16)}px`;
      tooltipElement.style.right = 'auto';
    }
    
    if (mouseInStage[1] > size[1] - BOTTOM_SPACING) {
      tooltipElement.style.top = 'auto';
      tooltipElement.style.bottom = `${size[1] - mouseInStage[1] + (options.tooltipOptions?.offsetY ?? 4)}px`;
    } else {
      tooltipElement.style.top = `${mouseInStage[1] + (options.tooltipOptions?.offsetY ?? 4)}px`;
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
    run(stats: IMarkingStats<T>): void {
      const message = getTooltipMessage(stats, options);
      
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
