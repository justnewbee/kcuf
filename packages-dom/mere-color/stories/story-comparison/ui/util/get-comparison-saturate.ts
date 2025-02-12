import {
  saturate as polishedSaturate
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  saturate as color2kSaturate
} from 'color2k';
import chroma from 'chroma-js';
import {
  filterSaturate,
  formatHex
} from 'culori';

import {
  saturate
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonSaturate(c: string, amount: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: saturate(c, amount),
    code: 'saturate(c, amount)'
  }, {
    key: 'polished',
    result: polishedSaturate(amount / 100, c),
    code: 'saturate(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).saturate(amount).toString('hex'),
    code: 'tinycolor2(c).saturate(amount).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).saturate(amount / 100).toHex(),
    code: 'colord(c).saturate(amount / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).saturate(amount / 100).hex(),
    code: 'new Color(c).saturate(amount / 100).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kSaturate(c, amount / 100)),
    code: 'saturate(c, amount / 100)'
  }, {
    key: 'chroma-js',
    result: chroma(c).saturate(amount / 100).hex(),
    code: 'chroma(c).saturate(amount / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterSaturate(amount / 100)(c)) || '',
    code: 'formatHex(filterSaturate(amount / 100)(c))'
  }];
}
