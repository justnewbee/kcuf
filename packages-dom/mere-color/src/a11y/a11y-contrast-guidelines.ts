import {
  IContrastScores
} from '../types';

import a11yContrast from './a11y-contrast';

/**
 * Determines which contrast guidelines have been met for two colors.
 * Based on the [contrast calculations recommended by W3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html).
 *
 * @example
 * const scores = meetsContrastGuidelines('#444', '#fff');
 */
export default function a11yContrastGuidelines(fgc: string, bgc?: string): IContrastScores {
  const contrast = a11yContrast(fgc, bgc);
  
  return {
    contrast,
    AAA: contrast >= 7,
    AAALarge: contrast >= 4.5,
    AA: contrast >= 4.5,
    AALarge: contrast >= 3
  };
}
