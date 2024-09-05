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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_REGULAR_TRIANGLE,
  PATH_INFO_ISOSCELES_RIGHT_TRIANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_CONVEX,
  PATH_INFO_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathArea(path: Path): number', () => {
    test('path length 0, 1, 2 → 0', () => {
      expect(pathArea(PATH_INFO_0.path)).toEqual(0);
      expect(pathArea(PATH_INFO_1.path)).toEqual(0);
      expect(pathArea(PATH_INFO_2.path)).toEqual(0);
    });
    
    test('path length > 2', () => {
      expect(pathArea(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.path)).toEqual(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.area);
      expect(pathArea(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.area);
      expect(pathArea(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.area);
      expect(pathArea(PATH_INFO_CONVEX.path)).toEqual(PATH_INFO_CONVEX.area);
      expect(pathArea(PATH_INFO_CONCAVE.path)).toEqual(PATH_INFO_CONCAVE.area);
      // expect(pathArea(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.area); // FIXME
    });
    
    test('area of a regular', () => {
      expect(pathArea(PATH_INFO_REGULAR_TRIANGLE.path)).toEqual(PATH_INFO_REGULAR_TRIANGLE.area);
    });
  });
});