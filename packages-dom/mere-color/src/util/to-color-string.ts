import {
  IColorHsl,
  IColorRgb
} from '../types';

import isRgb from './is-rgb';
import isHsl from './is-hsl';
import hslToString from './hsl-to-string';

export default function toColorString(o: IColorRgb | IColorHsl): string {
  if (isRgb(o)) {
    return `rgb(${o.r} ${o.g} ${o.b} / ${o.a}%)`;
  }
  
  if (isHsl(o)) {
    return hslToString(o);
  }
  
  return '';
}
