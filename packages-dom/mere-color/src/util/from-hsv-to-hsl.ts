import {
  IColorHsl,
  IColorHsv
} from '../types';

export default function fromHsvToHsl(hsv: IColorHsv): IColorHsl {
  const hh = ((200 - hsv.s) * hsv.v) / 100;
  
  return {
    h: hsv.h,
    s: hh > 0 && hh < 200 ? ((hsv.s * hsv.v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0,
    l: hh / 2,
    a: hsv.a
  };
}
