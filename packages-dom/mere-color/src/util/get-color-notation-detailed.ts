import {
  EColorNotationDetailed
} from '../enum';

import matchName from './match-name';
import matchHex from './match-hex';
import matchRgb from './match-rgb';
import matchRgbLegacy from './match-rgb-legacy';
import matchHsl from './match-hsl';
import matchHslLegacy from './match-hsl-legacy';

export default function getColorNotationDetailed(input: string): EColorNotationDetailed {
  if (matchName(input)) {
    return EColorNotationDetailed.NAME;
  }
  
  const hex = matchHex(input);
  
  if (hex) {
    switch (hex.length) {
    case 3:
      return EColorNotationDetailed.HEX3;
    case 4:
      return EColorNotationDetailed.HEX4;
    case 8:
      return EColorNotationDetailed.HEX8;
    default:
      return EColorNotationDetailed.HEX6;
    }
  }
  
  if (matchRgb(input)) {
    return EColorNotationDetailed.RGB;
  }
  
  if (matchRgbLegacy(input)) {
    return EColorNotationDetailed.RGB_LEGACY;
  }
  
  if (matchHsl(input)) {
    return EColorNotationDetailed.HSL;
  }
  
  if (matchHslLegacy(input)) {
    return EColorNotationDetailed.HSL_LEGACY;
  }
  
  return EColorNotationDetailed.UNKNOWN;
}
