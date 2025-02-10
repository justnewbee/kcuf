import {
  toColorString,
  parseToRgb
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
import chroma from 'chroma-js';
import {
  formatHex
} from 'culori';

import {
  toStringHex
} from '../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonToHex(c: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: toStringHex(c),
    code: 'toStringHex(c)'
  }, {
    key: 'polished',
    result: toColorString(parseToRgb(c)),
    code: 'toColorString(parseToRgb(c))'
  }, {
    key: 'colord',
    result: colord(c).toHex(),
    code: 'colord(c).toHex()'
  }, {
    key: 'color',
    result: new Color(c).hex(),
    code: 'new Color(c).hex()'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).toString('hex'),
    code: 'tinycolor2(c).toString(\'hex\')'
  }, {
    key: 'chroma-js',
    result: chroma(c).hex(),
    code: 'chroma(c).hex()'
  }, {
    key: 'culori',
    result: formatHex(c) || '',
    code: 'formatHex(c) '
  }];
}
