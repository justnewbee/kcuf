import {
  IHsl
} from '../types';
import {
  normalizeColorHsl,
  parseToHslUnnormalized
} from '../util';

/**
 * Parse valid color string into an `ColorHsl` object.
 */
export default function parseToHsl(color: string): IHsl | null {
  const hsl = parseToHslUnnormalized(color);
  
  return hsl ? normalizeColorHsl(hsl) : null;
}
