import {
  mixRgb,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Mixes two colors together by calculating the average of each RGB channel, returning the new color in the original notation normalized.
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
  
  return toColorStringOriginalNotation(mixRgb(rgb1, rgb2, ratio), color1);
}
