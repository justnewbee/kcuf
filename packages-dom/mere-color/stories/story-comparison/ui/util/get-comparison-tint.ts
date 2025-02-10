import {
  tint as polishedTint
} from 'polished';
// import tinycolor2 from 'tinycolor2';
// import { } from 'colord';
// import Color from 'color';
// import { } from 'color2k';
import chroma from 'chroma-js';
// import { } from 'culori';

import {
  tint
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonTint(c: string, percentage: number): TComparisonResult {
  return [{
    key: 'mere-color',
    result: tint(c, percentage),
    code: 'tint(c, percentage)'
  }, {
    key: 'polished',
    result: polishedTint(percentage / 100, c),
    code: 'tint(c)'
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
    result: chroma(c).tint(percentage / 100).hex(),
    code: 'chroma(c).tint(percentage / 100).hex()'
  }, {
    key: 'culori',
    result: null,
    code: ''
  }];
}
