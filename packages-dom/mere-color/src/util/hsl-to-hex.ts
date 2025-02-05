import {
  IColorHsl
} from '../types';

import rgbToHex from './rgb-to-hex';
import hslToRgb from './hsl-to-rgb';

export default function hslToHex(hsl: IColorHsl): string {
  return rgbToHex(hslToRgb(hsl));
}
