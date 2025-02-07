import {
  IColorRgb
} from '../types';

import matchHex from './match-hex';
import parseNumberHex from './parse-number-hex';
import parseNumberHexAlpha from './parse-number-hex-alpha';

/**
 * Parse any valid Hex3/4/6/8 string into an `RgbColor` object.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
 */
export default function parseColorHex(input: string): IColorRgb | null {
  const match = matchHex(input);
  
  if (!match) {
    return null;
  }
  
  return match.length < 6 ? {
    r: parseNumberHex(match.substring(0, 1)),
    g: parseNumberHex(match.substring(1, 2)),
    b: parseNumberHex(match.substring(2, 3)),
    a: parseNumberHexAlpha(match.substring(3, 4))
  } : {
    r: parseNumberHex(match.substring(0, 2)),
    g: parseNumberHex(match.substring(2, 4)),
    b: parseNumberHex(match.substring(4, 6)),
    a: parseNumberHexAlpha(match.substring(6, 8))
  };
}
