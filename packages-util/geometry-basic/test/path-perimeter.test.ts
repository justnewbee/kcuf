import {
  describe,
  test,
  expect
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathPerimeter
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE,
  TEST_PATH_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathPerimeter(path: Path): number', () => {
    test('Path with 0-1 points has no list of size 0', () => {
      expect(pathPerimeter(TEST_PATH_0.path)).toEqual(0);
      expect(pathPerimeter(TEST_PATH_1.path)).toEqual(0);
    });
    
    test('Path with 2+ points has segment list of size n', () => {
      expect(pathPerimeter(TEST_PATH_2.path)).toEqual(TEST_PATH_2.perimeter);
      expect(pathPerimeter(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.perimeter);
      expect(pathPerimeter(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.perimeter);
      expect(pathPerimeter(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.perimeter);
      expect(pathPerimeter(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.perimeter);
      expect(pathPerimeter(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.perimeter);
      expect(pathPerimeter(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.perimeter);
    });
  });
});