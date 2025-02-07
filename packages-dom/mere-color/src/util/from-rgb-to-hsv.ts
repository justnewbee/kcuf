import {
  IColorRgb,
  IColorHsv
} from '../types';

export default function fromRgbToHsv(rgb: IColorRgb): IColorHsv {
  const {
    r,
    g,
    b,
    a
  } = rgb;
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  const hh = delta ? max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta : 0;
  
  return {
    h: 60 * (hh < 0 ? hh + 6 : hh),
    s: max ? (delta / max) * 100 : 0,
    v: (max / 255) * 100,
    a
  };
}
