import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isPointIncluded
} from '../src';

import {
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE
} from './const';

describe('isPointIncluded(path: Path, p: Point): boolean', () => {
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(isPointIncluded([0, 1], TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
    expect(isPointIncluded([1, 0], TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
    expect(isPointIncluded([1, 1], TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
    expect(isPointIncluded([2, 2], TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    TEST_PATH_4_SQUARE.path.forEach(v => {
      expect(isPointIncluded(v, TEST_PATH_4_SQUARE.path)).toBe(true);
    });
  });
});
