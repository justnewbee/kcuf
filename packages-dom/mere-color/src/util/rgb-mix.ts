import {
  IRgb
} from '../types';

/**
 * Mixes two Rgb colors.
 */
export default function rgbMix(rgb1: IRgb, rgb2: IRgb, ratio: [number, number] = [1, 1]): IRgb {
  const weight1 = ratio[0] / (ratio[0] + ratio[1]);
  const weight2 = 1 - weight1;
  const {
    r: r1,
    g: g1,
    b: b1,
    a: a1 = 100
  } = rgb1;
  const {
    r: r2,
    g: g2,
    b: b2,
    a: a2 = 100
  } = rgb2;
  
  return {
    r: r1 * weight1 + r2 * weight2,
    g: g1 * weight1 + g2 * weight2,
    b: b1 * weight1 + b2 * weight2,
    a: a1 * weight1 + a2 * weight2
  };
}
