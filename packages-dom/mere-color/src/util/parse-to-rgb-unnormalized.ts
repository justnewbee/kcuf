import {
  IRgb
} from '../types';

import matchName from './match-name';
import parseColorHex from './parse-color-hex';
import parseColorRgb from './parse-color-rgb';
import parseColorHsl from './parse-color-hsl';
import fromHslToRgb from './from-hsl-to-rgb';

/**
 * Parse to un-normalized `ColorRgb` object.
 */
export default function parseToRgbUnnormalized(input: string): IRgb | null {
  const color = matchName(input) || input;
  const rgb = parseColorHex(color) || parseColorRgb(color);
  
  if (rgb) {
    return rgb;
  }
  
  const hsl = parseColorHsl(color);
  
  return hsl ? fromHslToRgb(hsl) : null;
}
