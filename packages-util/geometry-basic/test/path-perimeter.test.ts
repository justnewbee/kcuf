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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_4_SQUARE,
  PATH_INFO_4_RECTANGLE,
  PATH_INFO_5_CONVEX,
  PATH_INFO_6_CONCAVE,
  PATH_INFO_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathPerimeter(path: Path): number', () => {
    test('Path with 0-1 points has no list of size 0', () => {
      expect(pathPerimeter(PATH_INFO_0.path)).toEqual(0);
      expect(pathPerimeter(PATH_INFO_1.path)).toEqual(0);
    });
    
    test('Path with 2+ points has segment list of size n', () => {
      expect(pathPerimeter(PATH_INFO_2.path)).toEqual(PATH_INFO_2.perimeter);
      expect(pathPerimeter(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.perimeter);
      expect(pathPerimeter(PATH_INFO_4_SQUARE.path)).toEqual(PATH_INFO_4_SQUARE.perimeter);
      expect(pathPerimeter(PATH_INFO_4_RECTANGLE.path)).toEqual(PATH_INFO_4_RECTANGLE.perimeter);
      expect(pathPerimeter(PATH_INFO_5_CONVEX.path)).toEqual(PATH_INFO_5_CONVEX.perimeter);
      expect(pathPerimeter(PATH_INFO_6_CONCAVE.path)).toEqual(PATH_INFO_6_CONCAVE.perimeter);
      expect(pathPerimeter(PATH_INFO_4_CROSSING.path)).toEqual(PATH_INFO_4_CROSSING.perimeter);
    });
  });
});