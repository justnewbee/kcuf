import {
  EColorType
} from '../enum';
import {
  IColorHsl,
  IColorRgb
} from '../types';
import {
  getColorType
} from '../util';

import parseToRgb from './parse-to-rgb';
import parseToHsl from './parse-to-hsl';

/**
 * Parse input to its closest color format.
 */
export default function parse(input: string): IColorRgb | IColorHsl | null {
  switch (getColorType(input)) {
  case EColorType.NAME:
  case EColorType.HEX3:
  case EColorType.HEX4:
  case EColorType.HEX6:
  case EColorType.HEX8:
  case EColorType.RGB:
  case EColorType.RGB_LEGACY:
    return parseToRgb(input);
  case EColorType.HSL:
  case EColorType.HSL_LEGACY:
    return parseToHsl(input);
  case EColorType.UNKNOWN:
    return null;
  }
}
