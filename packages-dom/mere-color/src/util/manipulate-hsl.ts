import {
  IHsl
} from '../types';

import parseToHslUnnormalized from './parse-to-hsl-unnormalized';
import toColorStringOriginalNotation from './to-color-string-original-notation';

export default function manipulateHsl(color: string, change: (hsl: IHsl) => IHsl): string {
  const hsl = parseToHslUnnormalized(color);
  
  return hsl ? toColorStringOriginalNotation(change(hsl), color) : color;
}
