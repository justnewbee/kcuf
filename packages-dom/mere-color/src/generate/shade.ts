import {
  manipulateRgb,
  rgbMix
} from '../util';

/**
 * Shades a color by mixing it with black.
 *
 * `shade` can produce hue shifts, whereas `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 */
export default function shade(color: string, percentage = 10): string {
  return manipulateRgb(color, rgb => rgbMix(rgb, {
    r: 0,
    g: 0,
    b: 0
  }, [100 - percentage, percentage]));
}
