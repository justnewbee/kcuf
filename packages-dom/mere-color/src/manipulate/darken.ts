import {
  parseToHsl
} from '../parse';
import {
  shiftLightness,
  toColorStringOriginalNotation
} from '../util';

export default function darken(color: string, amount = 10): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorStringOriginalNotation(shiftLightness(hsl, amount > 0 ? -amount : 0), color);
}
