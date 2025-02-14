import {
  manipulateRgb,
  rgbInvert
} from '../util';

/**
 * Inverts the r/g/b channel of a color, returning the new color in the original notation normalized.
 */
export default function invert(color: string): string {
  return manipulateRgb(color, rgbInvert);
}
