import {
  IColorHsl
} from '../types';

import matchHsl from './match-hsl';
import matchHslLegacy from './match-hsl-legacy';
import parseNumberHue from './parse-number-hue';
import parseNumberSaturation from './parse-number-saturation';
import parseNumberLightness from './parse-number-lightness';
import parseNumberAlpha from './parse-number-alpha';
import normalizeColorHsl from './normalize-color-hsl';

/**
 * Parses a valid HSL[A] CSS color function/string
 * https://www.w3.org/TR/css-color-4/#the-hsl-notation
 */
export default function parseColorHsl(input: string): IColorHsl | null {
  const matchModern = matchHsl(input);
  const matchLegacy = matchModern ? null : matchHslLegacy(input);
  const match = matchModern || matchLegacy;
  
  if (!match) {
    return null;
  }
  
  return normalizeColorHsl({
    h: parseNumberHue(match[0] || '0', match[1]),
    s: parseNumberSaturation(match[2] || '0'),
    l: parseNumberLightness(match[3] || '0'),
    a: parseNumberAlpha(match[4], match[5])
  });
}
