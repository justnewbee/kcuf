import {
  computeBrightness
} from '../util';
import {
  parseToRgb
} from '../parse';

export default function a11yBrightness(color: string): number {
  const rgb = parseToRgb(color);
  
  return rgb ? computeBrightness(rgb) : -1;
}
