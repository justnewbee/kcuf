import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  nameConstStyledMixin
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('nameConstStyledMixin', () => {
    expect(nameConstStyledMixin('color', 'gray_1')).toEqual('MIXIN_COLOR_GRAY_1');
  });
});
