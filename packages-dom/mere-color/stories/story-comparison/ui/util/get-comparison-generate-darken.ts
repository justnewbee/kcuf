import {
  darken as polishedDarken
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  darken as color2kDarken
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
  darken
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonDarken(c: string, delta: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: darken(c, delta),
    code: 'darken(c, delta)'
  }, {
    key: 'polished',
    result: polishedDarken(delta / 100, c),
    code: 'darken(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).darken(delta).toString('hex'),
    code: 'tinycolor2(c).darken(delta).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).darken(delta / 100).toHex(),
    code: 'colord(c).darken(delta / 100).toHex()'
  }, {
    key: 'color',
    result: new Color(c).darken(delta / 100).hex(),
    code: 'new Color(c).darken(delta / 100).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kDarken(c, delta / 100)),
    code: 'darken(c, delta / 100)'
  }, {
    key: 'chroma-js',
    result: chroma(c).darken(delta / 100).hex(),
    code: 'chroma(c).darken(delta / 100).hex()'
  }, {
    key: 'culori',
    result: formatHex(filterBrightness(-delta / 100)(c)) || '',
    code: 'formatHex(filterBrightness(-delta / 100)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).darkerBy(delta).stringHEX(),
    code: 'colormaster(c).darkerBy(delta).stringHEX()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).darken(delta).toHexString(),
    code: 'new FastColor(c).darken(delta).toHexString()'
  }];
}
