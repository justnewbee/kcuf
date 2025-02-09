import {
  IHsl,
  IRgb
} from '../types';

import fromHsvToRgb from './from-hsv-to-rgb';
import fromHslToHsv from './from-hsl-to-hsv';

export default function fromHslToRgb(hsl: IHsl): IRgb {
  return fromHsvToRgb(fromHslToHsv(hsl));
}
