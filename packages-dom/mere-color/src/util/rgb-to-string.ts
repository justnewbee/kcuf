import {
  IRgb
} from '../types';

import rgbNormalize from './rgb-normalize';

export default function rgbToRgbString(rgb: IRgb): string {
  const {
    r,
    g,
    b,
    a
  } = rgbNormalize(rgb);
  let inner = `${r} ${g} ${b}`;
  
  if (a !== undefined && a < 100) {
    inner += ` / ${a}%`;
  }
  
  return `rgb(${inner})`;
}
