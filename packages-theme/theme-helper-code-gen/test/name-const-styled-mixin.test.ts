import {
  describe,
  expect,
  test
} from 'vitest';

import {
  nameConstStyledMixin
} from '../src';

describe('nameConstStyledMixin', () => {
  test('nameConstStyledMixin', () => {
    expect(nameConstStyledMixin('color', 'gray_1')).toEqual('MIXIN_COLOR_GRAY_1');
  });
});
