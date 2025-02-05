import {
  IColorRgb
} from '../types';
import {
  matchName,
  parseColorHex,
  parseColorRgb,
  parseColorHsl,
  hslToRgb
} from '../util';

/**
 * Parse any color string into an `RgbColor` object.
 *
 * Valid inputs are:
 *
 * - named colors
 * - hex3/4/6/8
 * - rgb(a) - modern/legacy
 * - hsl(a) - modern/legacy
 */
export default function parseToRgb(input: string): IColorRgb | null {
  const color = matchName(input) || input;
  const rgb = parseColorHex(color) || parseColorRgb(color);
  
  if (rgb) {
    return rgb;
  }
  
  const hsl = parseColorHsl(color);
  
  return hsl ? hslToRgb(hsl) : null;
}
