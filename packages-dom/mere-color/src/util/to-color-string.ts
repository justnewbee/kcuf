import {
  EColorNotation
} from '../enum';
import {
  IHsl,
  IRgb
} from '../types';

import isRgb from './is-rgb';
import isHsl from './is-hsl';
import normalizeColorRgb from './normalize-color-rgb';
import normalizeColorHsl from './normalize-color-hsl';
import fromRgbToHsl from './from-rgb-to-hsl';
import fromRgbToHex from './from-rgb-to-hex';
import fromRgbToString from './from-rgb-to-string';
import fromHslToRgb from './from-hsl-to-rgb';
import fromHslToHex from './from-hsl-to-hex';
import fromHslToString from './from-hsl-to-string';

export default function toColorString(o: IRgb | IHsl, format?: `${EColorNotation}`): string {
  if (isRgb(o)) {
    const rgb = normalizeColorRgb(o);
    
    switch (format) {
    case EColorNotation.HSL:
      return fromHslToString(fromRgbToHsl(rgb));
    case EColorNotation.HEX:
      return fromRgbToHex(rgb);
    default:
      return fromRgbToString(rgb);
    }
  }
  
  if (isHsl(o)) {
    const hsl = normalizeColorHsl(o);
    
    switch (format) {
    case EColorNotation.RGB:
      return fromRgbToString(fromHslToRgb(hsl));
    case EColorNotation.HEX:
      return fromHslToHex(hsl);
    default:
      return fromHslToString(hsl);
    }
  }
  
  return '';
}
