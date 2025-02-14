import {
  manipulateHsl,
  hslShiftSaturation
} from '../util';

/**
 * Increases the intensity of a color.
 */
export default function saturate(color: string, amount: number): string {
  return manipulateHsl(color, hsl => hslShiftSaturation(hsl, amount > 0 ? amount : 0));
}
