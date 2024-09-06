import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathHasSegmentCrossing
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE,
  TEST_PATH_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathHasSegmentCrossing(path: Path): Point | null', () => {
    test('no crossing - 0, 1, 2, 3 points', () => {
      expect(pathHasSegmentCrossing(TEST_PATH_0.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_1.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_2.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
    });

    test('no crossing', () => {
      expect(pathHasSegmentCrossing(TEST_PATH_4_RECTANGLE.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_4_SQUARE.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_5_CONVEX.path)).toBe(false);
      expect(pathHasSegmentCrossing(TEST_PATH_6_CONCAVE.path)).toBe(false);
    });
    
    test('crossing', () => {
      expect(pathHasSegmentCrossing(TEST_PATH_4_CROSSING.path)).toBe(true);
      // expect(pathHasSegmentCrossing([[1778.2, 2404.7], [2070, 2700.4], [2996.1, 2303.5], [2308.6, 2598.1]])).toBe(true); // FIXME 这个应该是 true
    });
  });
});