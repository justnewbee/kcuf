import {
  ICanvasMarkingOptions,
  IMarkingTooltipOptions,
  ICanvasMarkingStats
} from '../../../types';

import getTooltipMessageBasic from './get-tooltip-message-basic';
import getTooltipMessageExtra from './get-tooltip-message-extra';

export default function getTooltipMessage<T>(stats: ICanvasMarkingStats<T>, options: ICanvasMarkingOptions<T>, pluginOptions: IMarkingTooltipOptions<T>): string {
  if (!stats.mouseInCanvas) {
    return '';
  }
  
  const messageBasic = getTooltipMessageBasic(stats, options);
  const messageExtra = getTooltipMessageExtra(stats, pluginOptions); // 支持包含 HTML
  
  if (messageBasic && messageExtra) {
    return `<div class="extra-info">${messageExtra}</div>${messageBasic}`;
  }
  
  return messageExtra || messageBasic;
}
