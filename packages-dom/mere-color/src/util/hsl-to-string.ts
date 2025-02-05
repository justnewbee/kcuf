import {
  IColorHsl
} from '../types';

export default function hslToString(hsl: IColorHsl): string {
  return hsl.a !== undefined && hsl.a < 100 ? `hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / ${hsl.a}%)` : `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`;
}
