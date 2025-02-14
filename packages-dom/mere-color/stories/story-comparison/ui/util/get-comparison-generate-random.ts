// import { } from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  random as colordRandom
} from 'colord';
// import Color from 'color';
// import { } from 'color2k';
import chroma from 'chroma-js';
import {
  formatHex,
  random as culoriRandom
} from 'culori';
import {
  random as colormasterRandom
} from 'colormaster';

// import {
//   FastColor
// } from '@ant-design/fast-color';

import {
  random
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonRandom(): TComparisonResult {
  return [{
    key: 'mere-color',
    result: random(),
    code: 'random(c)'
  }, {
    key: 'polished',
    result: null,
    code: ''
  }, {
    key: 'tinycolor2',
    result: tinycolor2.random().toHexString(),
    code: 'tinycolor2.random().toHexString()'
  }, {
    key: 'colord',
    result: colordRandom().toHex(),
    code: 'random().toHex()'
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
    result: chroma.random().hex(),
    code: 'chroma.random().hex()'
  }, {
    key: 'culori',
    result: formatHex(culoriRandom()),
    code: 'formatHex(random())'
  }, {
    key: 'colormaster',
    result: colormasterRandom().stringHEX(),
    code: 'random().stringHEX()'
  }, {
    key: 'fast-color',
    result: null,
    code: ''
  }];
}
