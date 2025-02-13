import {
  mixRgb,
  toColorStringOriginalNotation
} from '../util';
import {
  parseToRgb
} from '../parse';

/**
 * Shades a color by mixing it with black.
 *
 * `shade` can produce hue shifts, whereas `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 */
export default function shade(color: string, percentage = 10): string {
  const rgb = parseToRgb(color);
  
  if (!rgb) {
    return color;
  }
  
  return toColorStringOriginalNotation(mixRgb(rgb, {
    r: 0,
    g: 0,
    b: 0
  }, [100 - percentage, percentage]), color);
}
