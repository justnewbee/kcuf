import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pointIsAlongPath
} from '../src';

import {
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
} from './const';

describe('pointIsAlongPath(point: Point, path: Path): boolean', () => {
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    TEST_PATH_3_ISOSCELES_RIGHT.path.forEach(v => {
      expect(pointIsAlongPath(v, TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(true);
    });
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    TEST_PATH_4_RECTANGLE.path.forEach(v => {
      expect(pointIsAlongPath(v, TEST_PATH_4_RECTANGLE.path)).toBe(true);
    });
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pointIsAlongPath([0, 1], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(pointIsAlongPath([1, 0], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(pointIsAlongPath([0, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(pointIsAlongPath([2, 0], TEST_PATH_4_SQUARE.path)).toBe(true);
    
    expect(pointIsAlongPath([1, 2], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(pointIsAlongPath([2, 2], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(pointIsAlongPath([2, 3], TEST_PATH_4_SQUARE.path)).toBe(false);
  });
});