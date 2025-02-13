import {
  invert as polishedInvert
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
// import {} from 'color2k';
// import chroma from 'chroma-js';
import {
  filterInvert,
  formatHex
} from 'culori';
import colormaster from 'colormaster';

import {
  invert
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonInvert(c: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: invert(c),
    code: 'invert(c)'
  }, {
    key: 'polished',
    result: polishedInvert(c),
    code: 'invert(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).complement().toString('hex'),
    code: 'tinycolor2(c).complement().toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).invert().toHex(),
    code: 'colord(c).invert().toHex()'
  }, {
    key: 'color',
    result: new Color(c).negate().hex(),
    code: 'new Color(c).negate().hex()'
  }, {
    key: 'color2k',
    result: null,
    code: ''
  }, {
    key: 'chroma-js',
    result: null,
    code: ''
  }, {
    key: 'culori',
    result: formatHex(filterInvert(1)(c)) || '',
    code: 'formatHex(filterInvert(1)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).invert().stringHEX(),
    code: ''
  }];
}
