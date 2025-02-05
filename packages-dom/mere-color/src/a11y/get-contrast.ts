import _round from 'lodash/round';

import getLuminance from './get-luminance';

/**
 * Returns a contrast ratio for a color pair [1-21].
 *
 * http://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export default function getContrast(fgc: string, bgc = '#fff'): number {
  const l1 = getLuminance(fgc);
  const l2 = getLuminance(bgc);
  
  return _round(l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05), 2);
}
