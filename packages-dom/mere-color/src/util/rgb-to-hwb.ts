import {
  IColorHwb,
  IColorRgb
} from '../types';

import rgbToHsv from './rgb-to-hsv';

export default function rgbToHwb(rgb: IColorRgb): IColorHwb {
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
