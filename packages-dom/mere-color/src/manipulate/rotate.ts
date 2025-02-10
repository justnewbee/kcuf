import {
  EHueUnit
} from '../enum';
import {
  adjustHue,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToHsl
} from '../parse';

/**
 * Rotate hue of a color, returning the new color in the original notation normalized.
 */
export default function rotate(color: string, amount: number, unit?: `${EHueUnit}`): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorStringOriginalNotation(adjustHue(hsl, amount, unit), color);
}
