import {
  IHwb,
  IRgb
} from '../types';

import rgbToHsv from './rgb-to-hsv';

export default function rgbToHwb(rgb: IRgb): IHwb {
  const {
    h
  } = rgbToHsv(rgb);
  const w = (Math.min(rgb.r, rgb.g, rgb.b) / 255) * 100;
  const b = 100 - (Math.max(rgb.r, rgb.g, rgb.b) / 255) * 100;
  
  return {
    h,
    w,
    b,
    a: rgb.a
  };
}
