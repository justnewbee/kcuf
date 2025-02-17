import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isPointWithinPath
} from '../src';

import {
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
} from './const';

describe('isPointWithinPath(point: Point, path: Path): boolean', () => {
  test('external', () => {
    expect(isPointWithinPath([0, 5], TEST_PATH_4_RECTANGLE.path)).toBe(false);
    expect(isPointWithinPath([5, 0], TEST_PATH_4_RECTANGLE.path)).toBe(false);
    expect(isPointWithinPath([3, 4], TEST_PATH_4_RECTANGLE.path)).toBe(false);
  });
  
  test('within', () => {
    expect(isPointWithinPath([1, 1], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(isPointWithinPath([1, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(isPointWithinPath([2, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
  });
  
  test('the points → false', () => {
    TEST_PATH_4_RECTANGLE.path.forEach(v => {
      expect(isPointWithinPath(v, TEST_PATH_4_RECTANGLE.path)).toBe(false);
    });
  });
  
  test('along border → false', () => {
    expect(isPointWithinPath([0, 1], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(isPointWithinPath([1, 0], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(isPointWithinPath([4, 1], TEST_PATH_4_SQUARE.path)).toBe(false);
  });
});
