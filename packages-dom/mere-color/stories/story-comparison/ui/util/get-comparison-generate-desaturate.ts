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

export default function getComparisonDesaturate(c: string, delta: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: desaturate(c, delta),
    code: 'desaturate(c, delta)'
  }, {
    key: 'polished',
    result: polishedDesaturate(delta / 100, c),
    code: 'desaturate(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).desaturate(delta).toString('hex'),
    code: 'tinycolor2(c).desaturate(delta).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).desaturate(delta / 100).toHex(),
    code: 'colord(c).desaturate(delta / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).desaturate(delta / 100).hex(),
    code: 'new Color(c).desaturate(delta / 100).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kDesaturate(c, delta / 100)),
    code: 'desaturate(c, delta / 100)'
  }, {
    key: 'chroma-js',
    result: chroma(c).desaturate(delta / 100).hex(),
    code: 'chroma(c).desaturate(delta / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterSaturate(-delta / 100)(c)) || '',
    code: 'formatHex(filterSaturate(-delta / 100)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).desaturateBy(delta).stringHEX(),
    code: 'colormaster(c).desaturateBy(delta).stringHEX()'
  }, {
    key: 'fast-color',
    result: null,
    code: ''
  }];
}
