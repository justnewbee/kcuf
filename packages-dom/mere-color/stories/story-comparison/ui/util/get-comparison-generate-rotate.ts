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

// import {
//   FastColor
// } from '@ant-design/fast-color';

import {
  rotate
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonRotate(c: string, delta: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: rotate(c, delta),
    code: 'rotate(c, delta)'
  }, {
    key: 'polished',
    result: adjustHue(delta, c),
    code: 'adjustHue(delta, c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).spin(delta).toString('hex'),
    code: 'tinycolor2(c).spin(delta).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).rotate(delta).toHex(),
    code: 'colord(c).rotate(delta).toHex()'
  }, {
    key: 'color',
    result: new Color(c).rotate(delta).hex(),
    code: 'new Color(c).rotate().hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kAdjustHue(c, delta)),
    code: 'adjustHue(c, delta)'
  }, {
    key: 'chroma-js',
    result: null,
    code: ''
  }, {
    key: 'culori',
    result: formatHex(filterHueRotate(delta)(c)) || '',
    code: 'formatHex(filterHueRotate(delta)(c))'
  }, {
    key: 'colormaster',
    result: colormaster(c).rotate(delta).stringHEX(),
    code: 'colormaster(c).rotate(delta).stringHEX()'
  }, {
    key: 'fast-color',
    result: null,
    code: ''
  }];
}
