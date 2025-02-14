import {
  EHueUnit
} from '../enum';
import {
  manipulateHsl,
  hslShiftHue
} from '../util';

/**
 * Rotate hue of a color, returning the new color in the original notation normalized.
 */
export default function rotate(color: string, delta: number, unit?: `${EHueUnit}`): string {
  return manipulateHsl(color, hsl => hslShiftHue(hsl, delta, unit));
}
