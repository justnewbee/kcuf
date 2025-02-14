import {
  desaturate as polishedDesaturate
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  desaturate as color2kDesaturate
} from 'color2k';
import chroma from 'chroma-js';
import {
  filterSaturate,
  formatHex
} from 'culori';
import colormaster from 'colormaster';

// import {
//   FastColor
// } from '@ant-design/fast-color';

import {
  desaturate
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonDesaturate(c: string, amount: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: desaturate(c, amount),
    code: 'desaturate(c, amount)'
  }, {
    key: 'polished',
    result: polishedDesaturate(amount / 100, c),
    code: 'desaturate(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).desaturate(amount).toString('hex'),
    code: 'tinycolor2(c).desaturate(amount).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).desaturate(amount / 100).toHex(),
    code: 'colord(c).desaturate(amount / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).desaturate(amount / 100).hex(),
    code: 'new Color(c).desaturate(amount / 100).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kDesaturate(c, amount / 100)),
    code: 'desaturate(c, amount / 100)'
  }, {
    key: 'chroma-js',
    result: chroma(c).desaturate(amount / 100).hex(),
    code: 'chroma(c).desaturate(amount / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterSaturate(-amount / 100)(c)) || '',
    code: 'formatHex(filterSaturate(-amount / 100)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).desaturateBy(amount).stringHEX(),
    code: 'colormaster(c).desaturateBy(amount).stringHEX()'
  }, {
    key: 'fast-color',
    result: null,
    code: ''
  }];
}
