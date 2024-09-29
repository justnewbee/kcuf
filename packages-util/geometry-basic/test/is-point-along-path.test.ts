import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isPointAlongPath
} from '../src';

import {
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
} from './const';

describe('isPointAlongPath(point: Point, path: Path): boolean', () => {
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    TEST_PATH_3_ISOSCELES_RIGHT.path.forEach(v => {
      expect(isPointAlongPath(v, TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(true);
    });
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    TEST_PATH_4_RECTANGLE.path.forEach(v => {
      expect(isPointAlongPath(v, TEST_PATH_4_RECTANGLE.path)).toBe(true);
    });
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(isPointAlongPath([0, 1], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(isPointAlongPath([1, 0], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(isPointAlongPath([0, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
    expect(isPointAlongPath([2, 0], TEST_PATH_4_SQUARE.path)).toBe(true);
    
    expect(isPointAlongPath([1, 2], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(isPointAlongPath([2, 2], TEST_PATH_4_SQUARE.path)).toBe(false);
    expect(isPointAlongPath([2, 3], TEST_PATH_4_SQUARE.path)).toBe(false);
  });
  
  test('bug fix', () => {
    expect(isPointAlongPath([2857.5015, 2849.8033], [
      [2444.898, 2608.1633],
      [2714.2857, 2922.449],
      [3559.1837, 2493.8776],
      [3363.744, 2593.0137]
    ], true)).toBe(true);
  });
  
  test('bug fix 2', () => {
    expect(isPointAlongPath([3325.6552, 2072.8126], [
      [2661.2245, 1824.4898],
      [2902.0408, 2469.3878],
      [3669.3878, 1751.0204]
    ], true)).toBe(true);
  });
});