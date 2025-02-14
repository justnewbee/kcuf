import {
  IRgb
} from '../types';
import {
  rgbNormalize,
  parseToRgbUnnormalized
} from '../util';

/**
 * Parse valid color string into an `ColorRgb` object.
 *
 * Valid inputs are:
 *
 * - named colors
 * - hex3/4/6/8
 * - rgb(a) - modern/legacy
 * - hsl(a) - modern/legacy
 */
export default function parseToRgb(color: string): IRgb | null {
  const rgb = parseToRgbUnnormalized(color);
  
  return rgb ? rgbNormalize(rgb) : null;
}
