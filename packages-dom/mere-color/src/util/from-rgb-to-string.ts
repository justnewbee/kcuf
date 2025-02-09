import {
  IRgb
} from '../types';

import normalizeColorRgb from './normalize-color-rgb';

export default function fromRgbToRgbString(rgb: IRgb): string {
  const {
    r,
    g,
    b,
    a
  } = normalizeColorRgb(rgb);
  let inner = `${r} ${g} ${b}`;
  
  if (a !== undefined && a < 100) {
    inner += ` / ${a}%`;
  }
  
  return `rgb(${inner})`;
}
