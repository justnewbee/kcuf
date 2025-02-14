import {
  IHsl
} from '../types';

import hslNormalize from './hsl-normalize';

export default function hslToString(hsl: IHsl): string {
  const {
    h,
    s,
    l,
    a
  } = hslNormalize(hsl);
  let inner = `${h} ${s}% ${l}%`;
  
  if (a !== undefined && a < 100) {
    inner += ` / ${a}%`;
  }
  
  return `hsl(${inner})`;
}
