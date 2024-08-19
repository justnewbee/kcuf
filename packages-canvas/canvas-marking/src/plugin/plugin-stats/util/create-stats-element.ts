import {
  createDiv
} from '../../../util';

import createStatsStyle from './create-stats-style';

export default function createStatsElement(stage: HTMLDivElement): HTMLDivElement {
  const divStats = createDiv(createStatsStyle(stage));
  
  stage.appendChild(divStats);
  
  return divStats;
}