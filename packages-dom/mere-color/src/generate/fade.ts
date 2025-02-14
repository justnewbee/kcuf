import {
  manipulateRgb
} from '../util';

/**
 * Set the absolute opacity of a color.
 *
 * 参考 https://lesscss.org/functions/#color-operations-fade
 */
export default function fade(color: string, toAlpha: number): string {
  return manipulateRgb(color, rgb => ({
    ...rgb,
    a: toAlpha
  }));
}
