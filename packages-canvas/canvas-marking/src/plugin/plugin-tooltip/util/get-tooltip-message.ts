import {
  ICanvasMarkingOptions,
  IMarkingStats
} from '../../../types';

import getTooltipMessageBasic from './get-tooltip-message-basic';
import getTooltipMessageExtra from './get-tooltip-message-extra';

export default function getTooltipMessage<T = unknown>(stats: IMarkingStats<T>, options: ICanvasMarkingOptions<T>): string {
  if (!stats.mouseInfo.coordsInCanvas || stats.moving) {
    return '';
  }
  
  const messageBasic = getTooltipMessageBasic(stats);
  const messageExtra = getTooltipMessageExtra(stats, options); // 支持包含 HTML
  
  if (messageBasic && messageExtra) {
    return `<div class="extra-info">${messageExtra}</div>${messageBasic}`;
  }
  
  return messageExtra || messageBasic;
}
