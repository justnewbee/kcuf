import {
  computeContrast
} from '../util';

import a11yLuminance from './a11y-luminance';

/**
 * Returns a contrast ratio for a color pair [1-21].
 *
 * http://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export default function a11yContrast(fgc: string, bgc = '#fff'): number {
  return computeContrast(a11yLuminance(fgc), a11yLuminance(bgc));
}
