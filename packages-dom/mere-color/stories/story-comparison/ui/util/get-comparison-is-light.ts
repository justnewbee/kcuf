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
  isLight
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonIsLight(c: string): TComparisonResult<boolean> {
  return [{
    key: 'mere-color',
    result: isLight(c),
    code: 'isLight(c)'
  }, {
    key: 'polished',
    result: null,
    code: ''
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).isLight(),
    code: 'tinycolor2(c).isLight()'
  }, {
    key: 'colord',
    result: colord(c).isLight(),
    code: 'colord(c).isLight()'
  }, {
    key: 'color',
    result: new Color(c).isLight(),
    code: 'new Color(c).isLight()'
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
    result: colormaster(c).isLight(),
    code: 'colormaster(c).isLight()'
  }, {
    key: 'fast-color',
    result: new FastColor(c).isLight(),
    code: 'new FastColor(c).isLight()'
  }];
}
