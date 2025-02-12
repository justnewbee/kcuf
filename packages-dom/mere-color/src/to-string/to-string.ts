import {
  EColorNotation
} from '../enum';
import {
  IHsl,
  IRgb
} from '../types';
import {
  getColorNotation,
  toColorString
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Convert or normalize color input to wanted format.
 */
export default function toString(input: string | IRgb | IHsl, format?: `${EColorNotation}`): string {
  if (typeof input === 'string') {
    const rgb = parseToRgb(input);
    
    if (rgb) {
      return toColorString(rgb, format ?? getColorNotation(input));
    }
    
    return input;
  }
  
  return toColorString(input, format);
}
