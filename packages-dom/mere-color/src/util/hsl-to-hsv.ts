import {
  IColorHsl,
  IColorHsv
} from '../types';

export default function hslToHsv(hsl: IColorHsl): IColorHsv {
  const s = hsl.s * (hsl.l < 50 ? hsl.l : 100 - hsl.l) / 100;
  
  return {
    h: hsl.h,
    s: s > 0 ? ((2 * s) / (hsl.l + s)) * 100 : 0,
    v: hsl.l + s,
    a: hsl.a
  };
}
