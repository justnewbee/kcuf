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
  PATH_INFO_3_REGULAR,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_4_SQUARE,
  PATH_INFO_4_RECTANGLE,
  PATH_INFO_4_DIAMOND,
  // PATH_INFO_4_CROSSING,
  PATH_INFO_5_CONVEX,
  PATH_INFO_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathArea(path: Path): number', () => {
    test('path length 0, 1, 2 → 0', () => {
      expect(pathArea(PATH_INFO_0.path)).toEqual(0);
      expect(pathArea(PATH_INFO_1.path)).toEqual(0);
      expect(pathArea(PATH_INFO_2.path)).toEqual(0);
    });
    
    test('path length > 2', () => {
      expect(pathArea(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.area);
      expect(pathArea(PATH_INFO_4_SQUARE.path)).toEqual(PATH_INFO_4_SQUARE.area);
      expect(pathArea(PATH_INFO_4_RECTANGLE.path)).toEqual(PATH_INFO_4_RECTANGLE.area);
      expect(pathArea(PATH_INFO_4_DIAMOND.path)).toEqual(PATH_INFO_4_DIAMOND.area);
      // expect(pathArea(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.area); // FIXME
      expect(pathArea(PATH_INFO_5_CONVEX.path)).toEqual(PATH_INFO_5_CONVEX.area);
      expect(pathArea(PATH_INFO_6_CONCAVE.path)).toEqual(PATH_INFO_6_CONCAVE.area);
    });
    
    test('area of a regular', () => {
      expect(pathArea(PATH_INFO_3_REGULAR.path)).toEqual(PATH_INFO_3_REGULAR.area);
    });
  });
});