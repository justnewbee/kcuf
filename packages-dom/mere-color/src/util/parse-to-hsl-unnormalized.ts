import {
  IHsl
} from '../types';

import matchName from './match-name';
import parseColorHex from './parse-color-hex';
import parseColorRgb from './parse-color-rgb';
import parseColorHsl from './parse-color-hsl';
import rgbToHsl from './rgb-to-hsl';

/**
 * Parse to un-normalized `ColorHsl` object.
 */
export default function parseToHslUnnormalized(input: string): IHsl | null {
  const color = matchName(input) || input;
  const hsl = parseColorHsl(color);
  
  if (hsl) {
    return hsl;
  }
  
  const rgb = parseColorHex(color) || parseColorRgb(color);
  
  return rgb ? rgbToHsl(rgb) : null;
}
