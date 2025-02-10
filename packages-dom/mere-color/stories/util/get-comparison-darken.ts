import {
  darken as polishedDarken
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
import chroma from 'chroma-js';
import {
  filterBrightness,
  formatHex
} from 'culori';

import {
  darken
} from '../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonDarken(c: string, amount: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: darken(c, amount),
    code: 'darken(c, amount)'
  }, {
    key: 'polished',
    result: polishedDarken(amount / 100, c),
    code: 'darken(c)'
  }, {
    key: 'colord',
    result: colord(c).darken(amount / 100).toHex(),
    code: 'colord(c).darken(amount / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).darken(amount / 100).hex(),
    code: 'new Color(c).darken(amount / 100).hex()'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).darken(amount).toString('hex'),
    code: 'tinycolor2(c).amount(amount).toString(\'hex\')'
  }, {
    key: 'chroma-js',
    result: chroma(c).darken(amount / 100).hex(),
    code: 'chroma(c).darken(amount / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterBrightness(-amount / 100)(c)) || '',
    code: 'formatHex(filterBrightness(-amount / 100)(c))'
  }];
}
