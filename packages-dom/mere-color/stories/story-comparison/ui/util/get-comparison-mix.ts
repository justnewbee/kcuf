import {
  mix as polishedMix
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  mix as color2kMix
} from 'color2k';
import chroma from 'chroma-js';
import {
  average,
  formatHex
} from 'culori';

import {
  mix
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonMix(c: string, c2: string): TComparisonResult {
  return [{
    key: 'mere-color',
    result: mix(c, c2),
    code: 'mix(c, c2)'
  }, {
    key: 'polished',
    result: polishedMix(0.5, c, c2),
    code: 'mix(0.5, c, c2)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2.mix(c, c2).toString('hex'),
    code: 'tinycolor2.mix(c, c2).toString(\'hex\')'
  }, {
    key: 'colord',
    result: colord(c).mix(c2).toHex(),
    code: 'colord(c).mix(c2).toHex()'
  }, {
    key: 'color',
    result: new Color(c).mix(new Color(c2)).hex(),
    code: 'new Color(c).mix(new Color(c2)).hex()'
  }, {
    key: 'color2k',
    result: protect(() => color2kMix(c, c2, 0.5)),
    code: 'mix(c, c2, weight)'
  }, {
    key: 'chroma-js',
    result: chroma.mix(c, c2).hex(),
    code: 'chroma.mix(c, c2).hex()'
  }, {
    key: 'culori',
    result: formatHex(average([c, c2])),
    code: 'formatHex(average([c, c2]))'
  }];
}
