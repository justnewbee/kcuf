import {
  getColorNotation,
  toColorString
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Inverts the r/g/b channel of a color, returning the new color in the original notation normalized.
 */
export default function invert(input: string): string {
  const rgb = parseToRgb(input);
  
  if (!rgb) {
    return input;
  }
  
  return toColorString({
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a
  }, getColorNotation(input));
}
