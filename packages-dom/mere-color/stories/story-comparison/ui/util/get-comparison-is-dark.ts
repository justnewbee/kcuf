// import {} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
// import {} from 'color2k';
// import chroma from 'chroma-js';
// import {} from 'culori';
import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  isDark
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonIsDark(c: string): TComparisonResult<boolean> {
  return [{
    key: 'mere-color',
    result: isDark(c),
    code: 'isDark(c)'
  }, {
    key: 'polished',
    result: null,
    code: ''
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).isDark(),
    code: 'tinycolor2(c).isDark()'
  }, {
    key: 'colord',
    result: colord(c).isDark(),
    code: 'colord(c).isDark()'
  }, {
    key: 'color',
    result: new Color(c).isDark(),
    code: 'new Color(c).isDark()'
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
    result: null,
    code: ''
  }, {
    key: 'colormaster',
    result: colormaster(c).isDark(),
    code: 'colormaster(c).isDark()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).isDark(),
    code: 'new FastColor(c).isDark()'
  }];
}
