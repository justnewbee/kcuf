import {
  IHsl
} from '../types';

import matchHsl from './match-hsl';
import matchHslLegacy from './match-hsl-legacy';
import parseNumberHue from './parse-number-hue';
import parseNumberSaturation from './parse-number-saturation';
import parseNumberLightness from './parse-number-lightness';
import parseNumberAlpha from './parse-number-alpha';

/**
 * Parse `hsla?(...)` color string into an `Hsl` object.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
 */
export default function parseColorHsl(input: string): IHsl | null {
  const matchModern = matchHsl(input);
  const matchLegacy = matchModern ? null : matchHslLegacy(input);
  const match = matchModern || matchLegacy;
  
  if (!match) {
    return null;
  }
  
  return {
    h: parseNumberHue(match[0] || '0', match[1]),
    s: parseNumberSaturation(match[2] || '0'),
    l: parseNumberLightness(match[3] || '0'),
    a: parseNumberAlpha(match[4], match[5])
  };
}
