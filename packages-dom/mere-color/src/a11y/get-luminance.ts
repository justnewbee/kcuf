import _round from 'lodash/round';

import {
  linearizeRgbChannel
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 *
 * ```ts
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 * ```
 *
 * // styled-components usage
 *
 * ```ts
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 * ```
 *
 * // CSS in JS Output
 *
 * ```css
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 * ```
 */
export default function getLuminance(color: string): number {
  const rgb = parseToRgb(color);
  
  if (!rgb) {
    return -1;
  }
  
  const cr = linearizeRgbChannel(rgb.r);
  const cg = linearizeRgbChannel(rgb.g);
  const cb = linearizeRgbChannel(rgb.b);
  
  return _round(0.2126 * cr + 0.7152 * cg + 0.0722 * cb, 3);
}
