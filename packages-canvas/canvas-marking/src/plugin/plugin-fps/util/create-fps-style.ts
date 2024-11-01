import {
  CLASS_FPS_TEXT,
  CLASS_FPS_GRAPH,
  CLASS_FPS_GRAPH_BAR,
  BAR_COUNT,
  BAR_HEIGHT
} from '../const';

export default function createFpsStyle(stage: HTMLDivElement): string {
  const style = document.createElement('style');
  const className = `marking-fps-${Date.now()}`;
  
  stage.appendChild(style);
  
  style.innerHTML = `.${className} {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px;
    background-color: hsl(0 0% 0% / 80%);
    pointer-events: none;
    z-index: 10;
  }
    
    .${className} .${CLASS_FPS_TEXT} {
      font: 600 9px/13px Helvetica, Arial, sans-serif;
      color: hsl(180 100% 47%);
    }
    
    .${className} .${CLASS_FPS_GRAPH} {
      width: ${BAR_COUNT}px;
      height: ${BAR_HEIGHT}px;
      background-color: hsl(180 100% 50% / 70%);
    }
    
    .${className} .${CLASS_FPS_GRAPH} .${CLASS_FPS_GRAPH_BAR} {
      width: 1px;
      height: 100%;
      float: left;
      background-color: hsl(120 50% 13%);
    }`;
  
  return className;
}