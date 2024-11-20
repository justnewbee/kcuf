import {
  createDomDiv
} from '../../../util';

import createStatsStyle from './create-stats-style';

export default function createStatsElement(stage: HTMLDivElement): HTMLDivElement {
  const divStats = createDomDiv(createStatsStyle(stage));
  
  stage.appendChild(divStats);
  
  return divStats;
}
