import {
  IHsv,
  IRgb
} from '../types';

export default function hsvToRgb(hsv: IHsv): IRgb {
  let {
    h,
    s,
    v
  } = hsv;
  
  h = (h / 360) * 6;
  s = s / 100;
  v = v / 100;
  
  const hh = Math.floor(h);
  const b = v * (1 - s);
  const c = v * (1 - (h - hh) * s);
  const d = v * (1 - (1 - h + hh) * s);
  const mod = hh % 6;
  
  return {
    r: ([v, c, b, b, d, v][mod] ?? 0) * 255,
    g: ([d, v, v, c, b, b][mod] ?? 0) * 255,
    b: ([b, b, d, v, v, c][mod] ?? 0) * 255,
    a: hsv.a
  };
}
