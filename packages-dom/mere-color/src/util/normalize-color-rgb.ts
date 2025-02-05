import {
  IColorRgb
} from '../types';

import normalizeHexValue from './normalize-hex-value';
import normalizeAlpha from './normalize-alpha';

export default function normalizeColorRgb(rgb: IColorRgb): IColorRgb {
  const normalized: IColorRgb = {
    r: normalizeHexValue(rgb.r),
    g: normalizeHexValue(rgb.g),
    b: normalizeHexValue(rgb.b)
  };
  
  if (rgb.a !== undefined && rgb.a < 100) {
    normalized.a = normalizeAlpha(rgb.a);
  }
  
  return normalized;
}
