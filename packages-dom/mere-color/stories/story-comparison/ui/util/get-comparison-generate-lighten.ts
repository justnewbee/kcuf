import {
  lighten as polishedLighten
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  lighten as color2kLighten
} from 'color2k';
import chroma from 'chroma-js';
import {
  filterBrightness,
  formatHex
} from 'culori';
import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  lighten
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

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
    key: 'tinycolor2',
    result: tinycolor2(c).lighten(amount).toString('hex'),
    code: 'tinycolor2(c).lighten(amount).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).lighten(amount / 100).toHex(),
    code: 'colord(c).lighten(amount / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).lighten(amount / 100).hex(),
    code: 'new Color(c).lighten(amount / 100).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kLighten(c, amount / 100)),
    code: 'lighten(c, amount / 100)'
  }, {
    key: 'chroma-js',
    result: chroma(c).brighten(amount / 100).hex(),
    code: 'chroma(c).brighten(amount / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterBrightness(amount / 100)(c)) || '',
    code: 'formatHex(filterBrightness(amount / 100)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).lighterBy(amount).stringHEX(),
    code: 'colormaster(c).lighterBy(amount).stringHEX()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).lighten(amount).toHexString(),
    code: 'new FastColor(c).lighten(amount).toHexString()'
  }];
}
