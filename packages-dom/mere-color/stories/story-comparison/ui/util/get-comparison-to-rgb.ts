import {
  rgb,
  parseToRgb
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  toRgba
} from 'color2k';
import chroma from 'chroma-js';
import {
  formatRgb
} from 'culori';
import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  toStringRgb
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

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
    key: 'tinycolor2',
    result: tinycolor2(c).toString('rgb'),
    code: 'tinycolor2(c).toString(\'rgb\')'
  }, {
    key: 'colord',
    result: colord(c).toRgbString(),
    code: 'colord(c).toRgbString()'
  }, {
    key: 'color',
    result: new Color(c).toString(),
    code: 'new Color(c).toString()'
  }, {
    key: 'color2k',
    result: protect(() => toRgba(c)),
    code: 'toRgba(c)'
  }, {
    key: 'chroma-js',
    result: chroma(c).css('rgb'),
    code: 'chroma(c).css(\'rgb\')'
  }, {
    key: 'culori',
    result: formatRgb(c) || '',
    code: 'formatRgb(c)'
  }, {
    key: 'colormaster',
    result: colormaster(c).stringRGB(),
    code: 'colormaster(c).stringRGB()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).toRgbString(),
    code: 'new FastColor(c).toRgbString()'
  }];
}
