import {
  EColorNotationDetailed
} from '../enum';
import {
  IHsl,
  IRgb
} from '../types';
import {
  getColorNotationDetailed
} from '../util';

import parseToRgb from './parse-to-rgb';
import parseToHsl from './parse-to-hsl';

/**
 * Parse input to its closest color format.
 */
export default function parse(input: string): IRgb | IHsl | null {
  switch (getColorNotationDetailed(input)) {
  case EColorNotationDetailed.NAME:
  case EColorNotationDetailed.HEX3:
  case EColorNotationDetailed.HEX4:
  case EColorNotationDetailed.HEX6:
  case EColorNotationDetailed.HEX8:
  case EColorNotationDetailed.RGB:
  case EColorNotationDetailed.RGB_LEGACY:
    return parseToRgb(input);
  case EColorNotationDetailed.HSL:
  case EColorNotationDetailed.HSL_LEGACY:
    return parseToHsl(input);
  case EColorNotationDetailed.UNKNOWN:
    return null;
  }
}
