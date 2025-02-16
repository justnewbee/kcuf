import {
  rgbMix,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Mix two colors together in variable proportion. Opacity is included in the calculations.
 *
 * https://lesscss.org/functions/#color-operations-mix
 */
export default function mix(color1: string, color2: string, ratio?: [number, number]): string {
  const rgb1 = parseToRgb(color1);
  const rgb2 = parseToRgb(color2);
  
  if (!rgb2) {
    return color1;
  }
  
  if (!rgb1) {
    return color2;
  }
  
  return toColorStringOriginalNotation(rgbMix(rgb1, rgb2, ratio), color1);
}
