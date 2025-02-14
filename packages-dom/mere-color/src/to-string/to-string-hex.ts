import {
  rgbToHex
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Convert color string to normalized hex string.
 */
export default function toStringHex(input: string): string {
  const rgb = parseToRgb(input);
  
  return rgb ? rgbToHex(rgb) : input;
}
