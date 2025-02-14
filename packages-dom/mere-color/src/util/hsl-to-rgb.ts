import {
  IHsl,
  IRgb
} from '../types';

import hsvToRgb from './hsv-to-rgb';
import hslToHsv from './hsl-to-hsv';

export default function hslToRgb(hsl: IHsl): IRgb {
  return hsvToRgb(hslToHsv(hsl));
}
