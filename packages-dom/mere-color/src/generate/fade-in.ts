import {
  manipulateRgb,
  rgbShiftAlpha
} from '../util';

/**
 * Decrease the transparency (or increase the opacity) of a color, making it more opaque.
 *
 * 参考 https://lesscss.org/functions/#color-operations-fadein
 */
export default function fadeIn(color: string, deltaAlpha = 10, max?: number): string {
  return manipulateRgb(color, rgb => rgbShiftAlpha(rgb, deltaAlpha > 0 ? deltaAlpha : 0, {
    max
  }));
}
