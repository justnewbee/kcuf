import {
  manipulateHsl,
  hslShiftSaturation
} from '../util';

/**
 * Decreases the intensity of a color.
 */
export default function desaturate(color: string, amount: number): string {
  return manipulateHsl(color, hsl => hslShiftSaturation(hsl, amount > 0 ? -amount : 0));
}
