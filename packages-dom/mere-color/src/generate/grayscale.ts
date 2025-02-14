import {
  manipulateRgb,
  rgbGrayscale
} from '../util';

/**
 * Turn a color into grayscale, by reducing its saturation to 0.
 */
export default function grayscale(color: string): string {
  return manipulateRgb(color, rgbGrayscale);
}
