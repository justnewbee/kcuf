import {
  adjustHue
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  adjustHue as color2kAdjustHue
} from 'color2k';
// import chroma from 'chroma-js';
import {
  formatHex,
  filterHueRotate
} from 'culori';
import colormaster from 'colormaster';

import {
  rotate
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonRotate(c: string, amount: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: rotate(c, amount),
    code: 'rotate(c, amount)'
  }, {
    key: 'polished',
    result: adjustHue(amount, c),
    code: 'adjustHue(amount, c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).spin(amount).toString('hex'),
    code: 'tinycolor2(c).spin(amount).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).rotate(amount).toHex(),
    code: 'colord(c).rotate(amount).toHex()'
  }, {
    key: 'color',
    result: new Color(c).rotate(amount).hex(),
    code: 'new Color(c).rotate().hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kAdjustHue(c, amount)),
    code: 'adjustHue(c, amount)'
  }, {
    key: 'chroma-js',
    result: null,
    code: ''
  }, {
    key: 'culori',
    result: formatHex(filterHueRotate(amount)(c)) || '',
    code: 'formatHex(filterHueRotate(amount)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).rotate(amount).stringHEX(),
    code: 'colormaster(c).rotate(amount).stringHEX()'
  }];
}
