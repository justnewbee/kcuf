import {
  fromHslToString
} from '../util';
import {
  parseToHsl
} from '../parse';

/**
 * Convert color string to normalized hsl string `hsl(h s% l%)`, `hsl(h s% l% / a%)`.
 */
export default function toStringHsl(input: string): string {
  const hsl = parseToHsl(input);
  
  return hsl ? fromHslToString(hsl) : input;
}
