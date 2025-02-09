import {
  computeLuminance
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Get the luminance of a color.
 */
export default function a11yLuminance(color: string): number {
  const rgb = parseToRgb(color);
  
  return rgb ? computeLuminance(rgb) : -1;
}
