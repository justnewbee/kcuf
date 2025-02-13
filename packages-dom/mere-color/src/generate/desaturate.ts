import {
  shiftSaturation,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToHsl
} from '../parse';

/**
 * Decreases the intensity of a color.
 */
export default function desaturate(color: string, amount: number): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorStringOriginalNotation(shiftSaturation(hsl, amount > 0 ? -amount : 0), color);
}
