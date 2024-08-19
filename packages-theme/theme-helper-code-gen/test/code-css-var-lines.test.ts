import {
  describe,
  test,
  expect
} from 'vitest';

import pkgInfo from '../package.json';
import {
  codeCssVarLines
} from '../src';

const info = {
  gray_0: '#fff',
  gray_12: '#000'
};
const info2 = {
  color: {
    gray_0: '#fff',
    gray_12: '#000',
    fake: {
      yoa: 'u'
    },
    red: ['red1', 'red2', 'red3']
  }
};

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('codeCssVarLines', () => {
    expect(codeCssVarLines(info)).toEqual([
      '--kf-gray-0: #fff;',
      '--kf-gray-12: #000;'
    ]);
    
    expect(codeCssVarLines(info, 'ts')).toEqual([
      '--ts-gray-0: #fff;',
      '--ts-gray-12: #000;'
    ]);
    
    expect(codeCssVarLines(info2)).toEqual([
      '--kf-color--gray-0: #fff;',
      '--kf-color--gray-12: #000;',
      '--kf-color--fake--yoa: u;',
      '--kf-color--red--0: red1;',
      '--kf-color--red--1: red2;',
      '--kf-color--red--2: red3;'
    ]);
  });
});
