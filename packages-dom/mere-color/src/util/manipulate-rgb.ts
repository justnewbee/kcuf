import {
  IRgb
} from '../types';

import parseToRgbUnnormalized from './parse-to-rgb-unnormalized';
import toColorStringOriginalNotation from './to-color-string-original-notation';

export default function manipulateRgb(color: string, change: (rgb: IRgb) => IRgb): string {
  const rgb = parseToRgbUnnormalized(color);
  
  return rgb ? toColorStringOriginalNotation(change(rgb), color) : color;
}
