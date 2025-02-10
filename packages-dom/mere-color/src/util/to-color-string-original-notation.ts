import {
  IHsl,
  IRgb
} from '../types';

import toColorString from './to-color-string';
import getColorNotation from './get-color-notation';

export default function toColorStringOriginalNotation(o: IRgb | IHsl, originalColor: string): string {
  return toColorString(o, getColorNotation(originalColor));
}
