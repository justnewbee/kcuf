import {
  manipulateRgb,
  rgbSetAlpha
} from '../util';

/**
 * Set the absolute opacity of a color.
 *
 * 参考 https://lesscss.org/functions/#color-operations-fade
 */
export default function fade(color: string, alpha: number): string {
  return manipulateRgb(color, rgb => rgbSetAlpha(rgb, alpha));
}
