import {
  getContrast
} from 'polished';
import tinycolor2 from 'tinycolor2';
import {
  colord
} from 'colord';
import Color from 'color';
import {
  getContrast as color2kGetContrast
} from 'color2k';
import chroma from 'chroma-js';
import {
  wcagContrast
} from 'culori';
import colormaster from 'colormaster';

// import {
//   FastColor
// } from '@ant-design/fast-color';

import {
  a11yContrast
} from '../../../../src';
import {
  TComparisonResult
} from '../types';

import protect from './protect';

export default function getComparisonA11yContrast(c: string, black?: boolean): TComparisonResult<number> {
  const bgOptional = black ? '#000' : undefined;
  const bgRequired = bgOptional ?? '#fff';
  
  return [{
    key: 'mere-color',
    result: a11yContrast(c, bgOptional),
    code: 'a11yContrast(c, bg?)'
  }, {
    key: 'polished',
    result: getContrast(c, bgRequired),
    code: 'getContrast(c, bg)'
  }, {
    key: 'tinycolor2',
    result: tinycolor2.readability(c, bgRequired),
    code: 'tinycolor2.readability(c, bg)'
  }, {
    key: 'colord',
    result: colord(c).contrast(bgOptional),
    code: 'colord(c).contrast(bg?)'
  }, {
    key: 'color',
    result: new Color(c).contrast(new Color(bgRequired)),
    code: 'new Color(c).contrast(Color)'
  }, {
    key: 'color2k',
    result: protect(() => color2kGetContrast(c, bgRequired)),
    code: 'getContrast(c, bg)'
  }, {
    key: 'chroma-js',
    result: chroma.contrast(c, bgRequired),
    code: `chroma.contrast(c, bg)`
  }, {
    key: 'culori',
    result: wcagContrast(c, bgRequired),
    code: 'wcagContrast(c, bg)'
  }, {
    key: 'colormaster',
    result: colormaster(c).contrast({
      bgColor: bgOptional
    }) as number,
    code: 'colormaster(c).contrast({ bgColor? }) as number'
  }, {
    key: 'fast-color',
    result: null,
    code: ''
  }];
}
