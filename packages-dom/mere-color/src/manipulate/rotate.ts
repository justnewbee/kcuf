import {
  EHueUnit
} from '../enum';
import {
  getAngleUnitValue,
  getColorNotation,
  toColorString
} from '../util';
import {
  parseToHsl
} from '../parse';

/**
 * Rotate hue of a color, returning the new color in the original notation normalized.
 */
export default function rotate(color: string, amount: number, unit?: `${EHueUnit}`): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  return toColorString({
    ...hsl,
    h: hsl.h + amount * getAngleUnitValue(unit)
  }, getColorNotation(color));
}
