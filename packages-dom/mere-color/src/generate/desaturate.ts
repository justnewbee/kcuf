import {
  manipulateHsl,
  hslShiftSaturation
} from '../util';

/**
 * Decreases the intensity of a color.
 */
export default function desaturate(color: string, delta: number): string {
  return manipulateHsl(color, hsl => hslShiftSaturation(hsl, delta > 0 ? -delta : 0));
}
