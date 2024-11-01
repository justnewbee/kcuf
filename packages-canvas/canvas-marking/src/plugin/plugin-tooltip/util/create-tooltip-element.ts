import {
  createDiv
} from '../../../util';

import createTooltipStyle from './create-tooltip-style';

export default function createTooltipElement(stage: HTMLDivElement): HTMLDivElement {
  const divTooltip = createDiv(createTooltipStyle(stage));
  
  stage.appendChild(divTooltip);
  
  return divTooltip;
}