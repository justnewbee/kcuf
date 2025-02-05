import {
  EColorType
} from '../enum';

import matchName from './match-name';
import matchHex from './match-hex';
import matchRgb from './match-rgb';
import matchRgbLegacy from './match-rgb-legacy';
import matchHsl from './match-hsl';
import matchHslLegacy from './match-hsl-legacy';

export default function getColorType(input: string): EColorType {
  if (matchName(input)) {
    return EColorType.NAME;
  }
  
  const hex = matchHex(input);
  
  if (hex) {
    switch (hex.length) {
    case 3:
      return EColorType.HEX3;
    case 4:
      return EColorType.HEX4;
    case 8:
      return EColorType.HEX8;
    default:
      return EColorType.HEX6;
    }
  }
  
  if (matchRgb(input)) {
    return EColorType.RGB;
  }
  
  if (matchRgbLegacy(input)) {
    return EColorType.RGB_LEGACY;
  }
  
  if (matchHsl(input)) {
    return EColorType.HSL;
  }
  
  if (matchHslLegacy(input)) {
    return EColorType.HSL_LEGACY;
  }
  
  return EColorType.UNKNOWN;
}
