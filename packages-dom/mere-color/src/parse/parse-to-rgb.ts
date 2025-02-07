import {
  IColorRgb
} from '../types';
import {
  matchName,
  parseColorHex,
  parseColorRgb,
  parseColorHsl,
  fromHslToRgb,
  normalizeColorRgb
} from '../util';

/**
 * Parse valid color string into an `ColorRgb` object.
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
    return normalizeColorRgb(rgb);
  }
  
  const hsl = parseColorHsl(color);
  
  return hsl ? normalizeColorRgb(fromHslToRgb(hsl)) : null;
}
