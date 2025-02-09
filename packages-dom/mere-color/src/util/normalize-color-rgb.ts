import {
  IRgb
} from '../types';

import normalizeHexValue from './normalize-hex-value';
import normalizeAlpha from './normalize-alpha';

export default function normalizeColorRgb(rgb: IRgb): IRgb {
  const normalized: IRgb = {
    r: normalizeHexValue(rgb.r),
    g: normalizeHexValue(rgb.g),
    b: normalizeHexValue(rgb.b)
  };
  
  if (rgb.a !== undefined && rgb.a < 100) {
    normalized.a = normalizeAlpha(rgb.a);
  }
  
  return normalized;
}
