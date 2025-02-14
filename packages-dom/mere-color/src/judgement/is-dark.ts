import {
  rgbComputeBrightness
} from '../util';
import {
  parseToRgb
} from '../parse';

export default function isDark(color: string): boolean {
  const rgb = parseToRgb(color);
  
  return rgb ? rgbComputeBrightness(rgb) < 128 : false;
}
