import {
  IColorHwb,
  IColorRgb
} from '../types';

import fromRgbToHsv from './from-rgb-to-hsv';

export default function fromRgbToHwb(rgb: IColorRgb): IColorHwb {
  const {
    h
  } = fromRgbToHsv(rgb);
  const w = (Math.min(rgb.r, rgb.g, rgb.b) / 255) * 100;
  const b = 100 - (Math.max(rgb.r, rgb.g, rgb.b) / 255) * 100;
  
  return {
    h,
    w,
    b,
    a: rgb.a
  };
}
