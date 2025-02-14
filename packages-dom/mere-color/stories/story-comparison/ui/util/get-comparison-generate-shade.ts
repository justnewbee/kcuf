import {
  shade as polishedShade
} from 'polished';
// import tinycolor2 from 'tinycolor2';
// import { } from 'colord';
// import Color from 'color';
// import { } from 'color2k';
import chroma from 'chroma-js';
// import { } from 'culori';
// import colormaster from 'colormaster';

import {
  FastColor
} from '@ant-design/fast-color';

import {
  shade
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonShade(c: string, percentage: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: shade(c, percentage),
    code: 'shade(c, percentage)'
  }, {
    key: 'polished',
    result: polishedShade(percentage / 100, c),
    code: 'shade(c)'
  }, {
    key: 'tinycolor2',
    result: null,
    code: ''
  }, {
    key: 'colord',
    result: null,
    code: ''
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
    result: chroma(c).shade(percentage / 100).hex(),
    code: 'chroma(c).shade(percentage / 100).hex()'
  }, {
    key: 'culori',
    result: null,
    code: ''
  }, {
    key: 'colormaster',
    result: null,
    code: ''
  }, {
    key: 'fast-color',
    result: new FastColor(c).shade(percentage).toHexString(),
    code: 'new FastColor(c).shade(percentage).toHexString()'
  }];
}
