import _round from 'lodash/round';

import {
  HslColorString,
  HslaColorString
} from '../../src';

function percentage(p: number): string {
  return `${_round(p * 100, 1)}%`;
}

export default function composeHslColorString(h: number, s: number, l: number, a?: number): HslColorString | HslaColorString {
  const str = `${_round(h, 1)} ${percentage(s)} ${percentage(l)}`;
  
  return `hsl(${a ? `${str} / ${percentage(a)}` : str})` as HslColorString | HslaColorString;
}
