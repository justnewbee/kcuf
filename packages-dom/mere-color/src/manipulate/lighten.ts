import {
  parseToHsl
} from '../parse';
import {
  shiftLightness,
  toColorStringOriginalNotation
} from '../util';

export default function lighten(color: string, amount = 10): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorStringOriginalNotation(shiftLightness(hsl, amount), color);
}
