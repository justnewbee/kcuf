import {
  createDomDiv
} from '../../../util';
import {
  CLASS_FPS_TEXT,
  CLASS_FPS_GRAPH,
  CLASS_FPS_GRAPH_BAR,
  BAR_COUNT
} from '../const';

import createFpsStyle from './create-fps-style';

export default function createFpsElements(stage: HTMLDivElement): [HTMLDivElement, HTMLDivElement, HTMLDivElement] {
  const divFps = createDomDiv(createFpsStyle(stage));
  const divFpsText = createDomDiv(CLASS_FPS_TEXT, '-');
  const divFpsGraph = createDomDiv(CLASS_FPS_GRAPH, ((): string => {
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
