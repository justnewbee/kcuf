import _round from 'lodash/round';
import {
  parseToHsl
} from 'polished';

function percentage(p: number): string {
  return `${_round(p * 100, 1)}%`;
}

export default function toHslColorString(color: string): string {
  const hsl = parseToHsl(color);
  const str = `${_round(hsl.hue, 1)} ${percentage(hsl.saturation)} ${percentage(hsl.lightness)}`;
  
  return `hsl(${'alpha' in hsl ? `${str} / ${percentage(hsl.alpha)}` : str})`;
}
