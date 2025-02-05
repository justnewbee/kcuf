import {
  IColorRgb
} from '../types';

import matchRgb from './match-rgb';
import matchRgbLegacy from './match-rgb-legacy';
import parseNumberAlpha from './parse-number-alpha';
import parseNumberRgbValue from './parse-number-rgb-value';
import normalizeColorRgb from './normalize-color-rgb';

/**
 * Parses a valid RGB[A] CSS color function/string
 *
 * https://www.w3.org/TR/css-color-4/#rgb-functions
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
 */
export default function parseColorRgb(input: string): IColorRgb | null {
  const matchModern = matchRgb(input);
  const matchLegacy = matchModern ? null : matchRgbLegacy(input);
  const match = matchModern || matchLegacy;
  
  if (!match || (matchLegacy && (match[1] !== match[3] || match[3] !== match[5]))) { // legacy format does not allow mixing number and percentage values
    return null;
  }
  
  return normalizeColorRgb({
    r: parseNumberRgbValue(match[0], match[1]),
    g: parseNumberRgbValue(match[2], match[3]),
    b: parseNumberRgbValue(match[4], match[5]),
    a: parseNumberAlpha(match[6], match[7])
  });
}
