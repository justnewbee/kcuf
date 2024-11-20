import {
  createDomDiv
} from '../../../util';

import createTooltipStyle from './create-tooltip-style';

export default function createTooltipElement(stage: HTMLDivElement): HTMLDivElement {
  const divTooltip = createDomDiv(createTooltipStyle(stage));
  
  stage.appendChild(divTooltip);
  
  return divTooltip;
}
