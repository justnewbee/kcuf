import {
  EColorNotation,
  EColorNotationDetailed
} from '../enum';

import getColorNotationDetailed from './get-color-notation-detailed';

/**
 * Get toString format according to color input
 */
export default function getColorNotation(input: string): EColorNotation {
  switch (getColorNotationDetailed(input)) {
  case EColorNotationDetailed.RGB:
  case EColorNotationDetailed.RGB_LEGACY:
    return EColorNotation.RGB;
  case EColorNotationDetailed.HSL:
  case EColorNotationDetailed.HSL_LEGACY:
    return EColorNotation.HSL;
  default:
    return EColorNotation.HEX;
  }
}
