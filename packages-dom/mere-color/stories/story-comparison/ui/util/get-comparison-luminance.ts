import {
  getLuminance
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  getLuminance as color2kGetLuminance
} from 'color2k';
import chroma from 'chroma-js';
import {
  wcagLuminance
} from 'culori';

import {
  a11yLuminance
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonLuminance(c: string): TComparisonResult<number> {
  return [{
    key: 'mere-color',
    result: a11yLuminance(c),
    code: 'a11yLuminance(c)'
  }, {
    key: 'polished',
    result: getLuminance(c),
    code: 'getLuminance(c)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2(c).getLuminance(),
    code: 'tinycolor2(c).getLuminance()'
  }, {
    key: 'colord',
    result: colord(c).luminance(),
    code: 'colord(c).luminance()'
  }, {
    key: 'color',
    result: new Color(c).luminosity(),
    code: 'new Color(c).luminosity()'
  }, {
    key: 'color2k',
    result: protect(() => color2kGetLuminance(c)),
    code: 'getLuminance(c)'
  }, {
    key: 'chroma-js',
    result: chroma(c).luminance(),
    code: `chroma(c).luminance()`
  }, {
    key: 'culori',
    result: wcagLuminance(c),
    code: 'wcagLuminance(c)'
  }];
}
