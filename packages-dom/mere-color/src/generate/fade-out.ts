import {
  manipulateRgb,
  rgbShiftAlpha
} from '../util';

/**
 * Increase the transparency (or decrease the opacity) of a color, making it less opaque.
 *
 * 参考 https://lesscss.org/functions/#color-operations-fadeout
 */
export default function fadeOut(color: string, deltaAlpha = 10, max?: number): string {
  return manipulateRgb(color, rgb => rgbShiftAlpha(rgb, deltaAlpha > 0 ? -deltaAlpha : 0, {
    max
  }));
}
