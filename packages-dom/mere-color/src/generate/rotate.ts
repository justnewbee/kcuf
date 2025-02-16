import {
  EHueUnit
} from '../enum';
import {
  manipulateHsl,
  hslShiftHue
} from '../util';

/**
 * Rotate (spin) hue angle of a color.
 *
 * https://lesscss.org/functions/#color-operations-spin
 */
export default function rotate(color: string, delta: number, unit?: `${EHueUnit}`): string {
  return manipulateHsl(color, hsl => hslShiftHue(hsl, delta, unit));
}
