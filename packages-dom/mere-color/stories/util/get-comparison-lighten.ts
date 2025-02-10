import {
  lighten as polishedLighten
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
  lighten
} from '../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonLighten(c: string, amount: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: lighten(c, amount),
    code: 'lighten(c, amount)'
  }, {
    key: 'polished',
    result: polishedLighten(amount / 100, c),
    code: 'lighten(c)'
  }, {
    key: 'colord',
    result: colord(c).lighten(amount / 100).toHex(),
    code: 'colord(c).lighten(amount / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).lighten(amount / 100).hex(),
    code: 'new Color(c).lighten(amount / 100).hex()'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).lighten(amount).toString('hex'),
    code: 'tinycolor2(c).amount(amount).toString(\'hex\')'
  }, {
    key: 'chroma-js',
    result: chroma(c).brighten(amount / 100).hex(),
    code: 'chroma(c).brighten(amount / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterBrightness(amount / 100)(c)) || '',
    code: 'formatHex(filterBrightness(amount / 100)(c))'
  }];
}
