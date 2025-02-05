import {
  IColorHsl
} from '../types';

import normalizeHue from './normalize-hue';
import normalizePercentage from './normalize-percentage';
import normalizeAlpha from './normalize-alpha';

export default function normalizeColorHsl(hsl: IColorHsl): IColorHsl {
  const normalized: IColorHsl = {
    h: normalizeHue(hsl.h),
    s: normalizePercentage(hsl.s),
    l: normalizePercentage(hsl.l)
  };
  
  if (hsl.a !== undefined && hsl.a < 100) {
    normalized.a = normalizeAlpha(hsl.a);
  }
  
  return normalized;
}
