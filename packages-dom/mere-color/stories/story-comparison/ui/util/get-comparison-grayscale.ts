import {
  grayscale as polishedGrayscale
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
// import {
// } from 'color2k';
// import chroma from 'chroma-js';
import {
  filterGrayscale,
  formatHex
} from 'culori';

import {
  grayscale
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

export default function getComparisonGrayscale(c: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: grayscale(c),
    code: 'grayscale(c)'
  }, {
    key: 'polished',
    result: polishedGrayscale(c),
    code: 'grayscale(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).greyscale().toString('hex'),
    code: 'tinycolor2(c).greyscale().toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).grayscale().toHex(),
    code: 'colord(c).grayscale().toHex()'
  }, {
    key: 'color',
    result: new Color(c).grayscale().hex(),
    code: 'new Color(c).grayscale().hex()'
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
    result: formatHex(filterGrayscale(1)(c)) || '',
    code: 'formatHex(filterGrayscale(1)(c))'
  }];
}
