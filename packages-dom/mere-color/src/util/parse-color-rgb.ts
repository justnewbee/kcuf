import {
  IRgb
} from '../types';

import matchRgb from './match-rgb';
import matchRgbLegacy from './match-rgb-legacy';
import parseNumberAlpha from './parse-number-alpha';
import parseNumberRgbValue from './parse-number-rgb-value';

/**
 * Parse `rgba?(...)` color string into an `Rgb` object.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
 */
export default function parseColorRgb(color: string): IRgb | null {
  const matchModern = matchRgb(color);
  const matchLegacy = matchModern ? null : matchRgbLegacy(color);
  const match = matchModern || matchLegacy;
  
  if (!match || (matchLegacy && (match[1] !== match[3] || match[3] !== match[5]))) { // legacy format does not allow mixing number and percentage values
    return null;
  }
  
  return {
    r: parseNumberRgbValue(match[0], match[1]),
    g: parseNumberRgbValue(match[2], match[3]),
    b: parseNumberRgbValue(match[4], match[5]),
    a: parseNumberAlpha(match[6], match[7])
  };
}
