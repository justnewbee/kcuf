import _round from 'lodash/round';

import {
  IRgb
} from '../types';

/**
 * Converts an RGB channel [0-255] to its linear light (un-companded) form [0-1].
 * Linearized RGB values are widely used for color space conversions and contrast calculations
 */
function linearizeRgbChannel(value: number): number {
  const channel = value / 255;
  
  return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

/**
 * Compute the luminance of Rgb.
 */
export default function rgbComputeLuminance(rgb: IRgb): number {
  const cr = linearizeRgbChannel(rgb.r);
  const cg = linearizeRgbChannel(rgb.g);
  const cb = linearizeRgbChannel(rgb.b);
  
  return _round(0.2126 * cr + 0.7152 * cg + 0.0722 * cb, 3);
}
