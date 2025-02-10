import {
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Turn a color into grayscale, by reducing its saturation to 0.
 */
export default function grayscale(color: string): string {
  const rgb = parseToRgb(color);
  
  if (!rgb) {
    return color;
  }
  
  const {
    r,
    g,
    b,
    a
  } = rgb;
  const gray = r * 0.3 + g * 0.59 + b * 0.11;
  
  return toColorStringOriginalNotation({
    r: gray,
    g: gray,
    b: gray,
    a
  }, color);
}
