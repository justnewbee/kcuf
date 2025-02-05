import {
  IColorRgb
} from '../types';

function format(number: number): string {
  const hex = Math.round(number).toString(16);
  
  return hex.length < 2 ? `0${hex}` : hex;
}

export default function rgbToHex(rgb: IColorRgb): string {
  const alphaHex = rgb.a !== undefined && rgb.a < 100 ? format(rgb.a * 255 / 100) : '';
  
  return `#${format(rgb.r)}${format(rgb.g)}${format(rgb.b)}${alphaHex}`;
}
