import {
  mixRgb,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Tints a color by mixing it with white.
 *
 * `tint` can produce hue shifts, whereas `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 */
export default function tint(color: string, percentage = 10): string {
  const rgb = parseToRgb(color);
  
  if (!rgb) {
    return color;
  }
  
  return toColorStringOriginalNotation(mixRgb(rgb, {
    r: 255,
    g: 255,
    b: 255
  }, [100 - percentage, percentage]), color);
}
