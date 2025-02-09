import {
  IHsl
} from '../types';
import {
  matchName,
  parseColorHex,
  parseColorRgb,
  parseColorHsl,
  fromRgbToHsl,
  normalizeColorHsl
} from '../util';

/**
 * Parse valid color string into an `ColorHsl` object.
 */
export default function parseToHsl(input: string): IHsl | null {
  const color = matchName(input) || input;
  const hsl = parseColorHsl(color);
  
  if (hsl) {
    return normalizeColorHsl(hsl);
  }
  
  const rgb = parseColorHex(color) || parseColorRgb(color);
  
  return rgb ? normalizeColorHsl(fromRgbToHsl(rgb)) : null;
}
