import {
  hsl,
  parseToHsl
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
import chroma from 'chroma-js';
import {
  formatHsl
} from 'culori';

import {
  toStringHsl
} from '../../src';
import {
  TComparisonResult
} from '../types';

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
    key: 'colord',
    result: colord(c).toHslString(),
    code: 'colord(c).toHslString()'
  }, {
    key: 'color',
    result: new Color(c).hsl().toString(),
    code: 'new Color(c).hsl().toString()'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).toString('hsl'),
    code: 'tinycolor2(c).toString(\'hsl\')'
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
