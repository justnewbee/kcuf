import {
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Inverts the r/g/b channel of a color, returning the new color in the original notation normalized.
 */
export default function invert(color: string): string {
  const rgb = parseToRgb(color);
  
  if (!rgb) {
    return color;
  }
  
  return toColorStringOriginalNotation({
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a
  }, color);
}
