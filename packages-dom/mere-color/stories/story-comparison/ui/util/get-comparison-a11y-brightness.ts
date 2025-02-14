// import { } from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
// import Color from 'color';
// import { } from 'color2k';
// import chroma from 'chroma-js';
// import { } from 'culori';
import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  a11yBrightness
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonA11yBrightness(c: string): TComparisonResult<number> {
  return [{
    key: 'mere-color',
    result: a11yBrightness(c),
    code: 'a11yBrightness(c)'
  }, {
    key: 'polished',
    result: null,
    code: ''
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).getBrightness(),
    code: 'tinycolor2(c).getBrightness()'
  }, {
    key: 'colord',
    result: colord(c).brightness(),
    code: 'colord(c).brightness()'
  }, {
    key: 'color',
    result: null,
    code: ''
  }, {
    key: 'color2k',
    result: null,
    code: ''
  }, {
    key: 'chroma-js',
    result: null,
    code: ``
  }, {
    key: 'culori',
    result: null,
    code: ''
  }, {
    key: 'colormaster',
    result: colormaster(c).brightness(),
    code: 'colormaster(c).brightness()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).getBrightness(),
    code: 'new FastColor(c).getBrightness()'
  }];
}
