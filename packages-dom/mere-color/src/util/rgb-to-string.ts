import {
  IColorRgb
} from '../types';

export default function rgbToString(rgb: IColorRgb): string {
  return rgb.a !== undefined && rgb.a < 100 ? `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${rgb.a}%)` : `rgb(${rgb.r} ${rgb.g} ${rgb.b}`;
}
