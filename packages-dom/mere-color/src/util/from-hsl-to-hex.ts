import {
  IHsl
} from '../types';

import fromRgbToHex from './from-rgb-to-hex';
import fromHslToRgb from './from-hsl-to-rgb';

export default function fromHslToHex(hsl: IHsl): string {
  return fromRgbToHex(fromHslToRgb(hsl));
}
