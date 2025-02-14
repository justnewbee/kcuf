import {
  EColorNotation
} from '../enum';
import {
  IHsl,
  IRgb
} from '../types';

import isRgb from './is-rgb';
import isHsl from './is-hsl';
import rgbNormalize from './rgb-normalize';
import hslNormalize from './hsl-normalize';
import rgbToHsl from './rgb-to-hsl';
import rgbToHex from './rgb-to-hex';
import rgbToString from './rgb-to-string';
import hslToRgb from './hsl-to-rgb';
import hslToHex from './hsl-to-hex';
import hslToString from './hsl-to-string';

export default function toColorString(o: IRgb | IHsl, format?: `${EColorNotation}`): string {
  if (isRgb(o)) {
    const rgb = rgbNormalize(o);
    
    switch (format) {
    case EColorNotation.HSL:
      return hslToString(rgbToHsl(rgb));
    case EColorNotation.HEX:
      return rgbToHex(rgb);
    default:
      return rgbToString(rgb);
    }
  }
  
  if (isHsl(o)) {
    const hsl = hslNormalize(o);
    
    switch (format) {
    case EColorNotation.RGB:
      return rgbToString(hslToRgb(hsl));
    case EColorNotation.HEX:
      return hslToHex(hsl);
    default:
      return hslToString(hsl);
    }
  }
  
  return '';
}
