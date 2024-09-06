import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathArea
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathArea(path: Path): number', () => {
    test('path length 0, 1, 2 → 0', () => {
      expect(pathArea(TEST_PATH_0.path)).toEqual(0);
      expect(pathArea(TEST_PATH_1.path)).toEqual(0);
      expect(pathArea(TEST_PATH_2.path)).toEqual(0);
    });
    
    test('path length > 2', () => {
      expect(pathArea(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.area);
      expect(pathArea(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.area);
      expect(pathArea(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.area);
      expect(pathArea(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.area);
      // expect(pathArea(TEST_PATH_CROSSING.path)).toEqual(TEST_PATH_CROSSING.area); // FIXME
      expect(pathArea(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.area);
      expect(pathArea(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.area);
    });
    
    test('area of a regular', () => {
      expect(pathArea(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.area);
    });
  });
});