import {
  rgb,
  parseToRgb
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
import chroma from 'chroma-js';
import {
  formatRgb
} from 'culori';

import {
  toStringRgb
} from '../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonToRgb(c: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: toStringRgb(c),
    code: 'toStringHex(c)'
  }, {
    key: 'polished',
    result: rgb(parseToRgb(c)),
    code: 'rgb(parseToRgb(c))'
  }, {
    key: 'colord',
    result: colord(c).toRgbString(),
    code: 'colord(c).toRgbString()'
  }, {
    key: 'color',
    result: new Color(c).toString(),
    code: 'new Color(c).toString()'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).toString('rgb'),
    code: 'tinycolor2(c).toString(\'rgb\')'
  }, {
    key: 'chroma-js',
    result: chroma(c).css('rgb'),
    code: 'chroma(c).css(\'rgb\')'
  }, {
    key: 'culori',
    result: formatRgb(c) || '',
    code: 'formatRgb(c) '
  }];
}
