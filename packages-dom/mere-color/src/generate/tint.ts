import {
  manipulateRgb,
  rgbMix
} from '../util';

/**
 * Tints a color by mixing it with white.
 *
 * `tint` can produce hue shifts, whereas `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * Mix color with white in variable proportion.
 */
export default function tint(color: string, percentage = 10): string {
  return manipulateRgb(color, rgb => rgbMix(rgb, {
    r: 255,
    g: 255,
    b: 255
  }, [100 - percentage, percentage]));
}
