// import {} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
// import Color from 'color';
// import {} from 'color2k';
// import chroma from 'chroma-js';
// import {} from 'culori';
import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  isEqual
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonIsEqual(c: string, c2: string): TComparisonResult<boolean> {
  return [{
    key: 'mere-color',
    result: isEqual(c, c2),
    code: 'isEqual(c)'
  }, {
    key: 'polished',
    result: null,
    code: ''
  }, {
    key: 'tinycolor2',
    result: tinycolor2.equals(c, c2),
    code: 'tinycolor2.equals(c, c2)'
  }, {
    key: 'colord',
    result: colord(c).isEqual(c2),
    code: 'colord(c).isEqual(c2)'
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
    code: ''
  }, {
    key: 'culori',
    result: null,
    code: ''
  }, {
    key: 'colormaster',
    result: colormaster(c).equalTo(c2),
    code: 'colormaster(c).equalTo(c2)'
  }, {
    key: 'fast-color',
    result: new FastColor(c).equals(new FastColor(c2)),
    code: 'new FastColor(c).equals(new FastColor(c2))'
  }];
}
