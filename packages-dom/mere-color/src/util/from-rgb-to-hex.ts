import {
  IRgb
} from '../types';

import numberToHex from './number-to-hex';
import normalizeColorHex from './normalize-color-hex';

export default function fromRgbToHex(rgb: IRgb): string {
  const alphaHex = rgb.a !== undefined && rgb.a < 100 ? numberToHex(rgb.a * 255 / 100) : '';
  
  return normalizeColorHex(`#${numberToHex(rgb.r)}${numberToHex(rgb.g)}${numberToHex(rgb.b)}${alphaHex}`);
}
