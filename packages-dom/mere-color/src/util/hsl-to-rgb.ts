import {
  IColorHsl,
  IColorRgb
} from '../types';

import hsvToRgb from './hsv-to-rgb';
import hslToHsv from './hsl-to-hsv';

export default function hslToRgb(hsl: IColorHsl): IColorRgb {
  return hsvToRgb(hslToHsv(hsl));
}
