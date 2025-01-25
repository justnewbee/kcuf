import {
  parseToHsl
} from 'polished';

import {
  HslColorString,
  HslaColorString
} from '../../src';

import composeHslColorString from './compose-hsl-color-string';

export default function toHslColorString(color: string): HslColorString | HslaColorString {
  const hsl = parseToHsl(color);
  
  return composeHslColorString(hsl.hue, hsl.saturation, hsl.lightness, 'alpha' in hsl ? hsl.alpha : undefined);
}
