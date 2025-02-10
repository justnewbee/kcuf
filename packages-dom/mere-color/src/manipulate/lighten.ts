import {
  parseToHsl
} from '../parse';
import {
  adjustLightness,
  toColorStringOriginalNotation
} from '../util';

export default function lighten(color: string, amount = 10): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorStringOriginalNotation(adjustLightness(hsl, amount), color);
}
