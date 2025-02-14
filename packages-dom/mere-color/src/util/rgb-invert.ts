import {
  IRgb
} from '../types';

/**
 * Inverts the r/g/b channel of a color.
 */
export default function rgbInvert(rgb: IRgb): IRgb {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a
  };
}
