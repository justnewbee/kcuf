import {
  IColorHsl
} from '../types';
import {
  matchName,
  parseColorHex,
  parseColorRgb,
  parseColorHsl,
  rgbToHsl
} from '../util';

/**
 * Returns an `HslColor` object. This utility function is only useful if want to extract a color component.
 * With the color util `toColorString` you can convert an `HslColor` object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(210, 10%, 40%, 0.75)');
 */
export default function parseToHsl(input: string): IColorHsl | null {
  const color = matchName(input) || input;
  const hsl = parseColorHsl(color);
  
  if (hsl) {
    return hsl;
  }
  
  const rgb = parseColorHex(color) || parseColorRgb(color);
  
  return rgb ? rgbToHsl(rgb) : null;
}
