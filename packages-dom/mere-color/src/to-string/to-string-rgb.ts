import {
  rgbToString
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Convert color string to normalized rgb string `rgb(r g b)`, `rgb(r g b / a%)`.
 */
export default function toStringRgb(input: string): string {
  const rgb = parseToRgb(input);
  
  return rgb ? rgbToString(rgb) : input;
}
