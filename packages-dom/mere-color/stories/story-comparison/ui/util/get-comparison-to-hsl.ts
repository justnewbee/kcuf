import {
  hsl,
  parseToHsl
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  toHsla
} from 'color2k';
import chroma from 'chroma-js';
import {
  formatHsl
} from 'culori';

import {
  toStringHsl
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonToHsl(c: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: toStringHsl(c),
    code: 'toStringHsl(c)'
  }, {
    key: 'polished',
    result: hsl(parseToHsl(c)),
    code: 'hsl(parseToHsl(c))'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).toString('hsl'),
    code: 'tinycolor2(c).toString(\'hsl\')'
  }, {
    key: 'colord',
    result: colord(c).toHslString(),
    code: 'colord(c).toHslString()'
  }, {
    key: 'color',
    result: new Color(c).hsl().toString(),
    code: 'new Color(c).hsl().toString()'
  }, {
    key: 'color2k',
    result: protect(() => toHsla(c)),
    code: 'toHsla(c)'
  }, {
    key: 'chroma-js',
    result: chroma(c).css('hsl'),
    code: 'chroma(c).css(\'hsl\')'
  }, {
    key: 'culori',
    result: formatHsl(c) || '',
    code: 'formatHsl(c) '
  }];
}
