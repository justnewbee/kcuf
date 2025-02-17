import {
  manipulateHsl,
  hslShiftSaturation
} from '../util';

/**
 * Increases the intensity of a color.
 */
export default function saturate(color: string, delta: number): string {
  return manipulateHsl(color, hsl => hslShiftSaturation(hsl, delta > 0 ? delta : 0));
}
