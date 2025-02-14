import {
  IRgb
} from '../types';

/**
 * https://www.w3.org/TR/AERT/#color-contrast
 */
export default function rgbComputeBrightness(rgb: IRgb): number {
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}
