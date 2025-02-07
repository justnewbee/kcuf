import {
  IColorHsl
} from '../types';

import normalizeColorHsl from './normalize-color-hsl';

export default function fromHslToString(hsl: IColorHsl): string {
  const {
    h,
    s,
    l,
    a
  } = normalizeColorHsl(hsl);
  let inner = `${h} ${s}% ${l}%`;
  
  if (a !== undefined && a < 100) {
    inner += ` / ${a}%`;
  }
  
  return `hsl(${inner})`;
}
