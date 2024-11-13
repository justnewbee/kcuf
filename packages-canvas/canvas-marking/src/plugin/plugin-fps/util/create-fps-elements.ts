import {
  createDiv
} from '../../../util';
import {
  CLASS_FPS_TEXT,
  CLASS_FPS_GRAPH,
  CLASS_FPS_GRAPH_BAR,
  BAR_COUNT
} from '../const';

import createFpsStyle from './create-fps-style';

export default function createFpsElements(stage: HTMLDivElement): [HTMLDivElement, HTMLDivElement, HTMLDivElement] {
  const divFps = createDiv(createFpsStyle(stage));
  const divFpsText = createDiv(CLASS_FPS_TEXT, '-');
  const divFpsGraph = createDiv(CLASS_FPS_GRAPH, (() => {
    const fpsBars = [];
    
    for (let i = 0; i < BAR_COUNT; i++) {
      fpsBars.push(`<span class="${CLASS_FPS_GRAPH_BAR}"></span>`);
    }
    
    return fpsBars.join('');
  })());
  
  divFps.appendChild(divFpsText);
  divFps.appendChild(divFpsGraph);
  
  stage.appendChild(divFps);
  
  return [divFps, divFpsText, divFpsGraph];
}
