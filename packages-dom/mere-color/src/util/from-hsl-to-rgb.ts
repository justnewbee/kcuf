import {
  IColorHsl,
  IColorRgb
} from '../types';

import fromHsvToRgb from './from-hsv-to-rgb';
import fromHslToHsv from './from-hsl-to-hsv';

export default function fromHslToRgb(hsl: IColorHsl): IColorRgb {
  return fromHsvToRgb(fromHslToHsv(hsl));
}
