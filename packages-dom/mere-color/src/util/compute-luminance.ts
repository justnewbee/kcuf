import _round from 'lodash/round';

import {
  IRgb
} from '../types';

import linearizeRgbChannel from './linearize-rgb-channel';

/**
 * Compute the luminance of Rgb.
 */
export default function computeLuminance(rgb: IRgb): number {
  const cr = linearizeRgbChannel(rgb.r);
  const cg = linearizeRgbChannel(rgb.g);
  const cb = linearizeRgbChannel(rgb.b);
  
  return _round(0.2126 * cr + 0.7152 * cg + 0.0722 * cb, 3);
}
