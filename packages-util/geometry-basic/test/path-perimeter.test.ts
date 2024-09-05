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
  PATH_INFO_ISOSCELES_RIGHT_TRIANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_CONVEX,
  PATH_INFO_CONCAVE,
  PATH_INFO_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathPerimeter(path: Path): number', () => {
    test('Path with 0-1 points has no list of size 0', () => {
      expect(pathPerimeter(PATH_INFO_0.path)).toEqual(0);
      expect(pathPerimeter(PATH_INFO_1.path)).toEqual(0);
    });
    
    test('Path with 2+ points has segment list of size n', () => {
      expect(pathPerimeter(PATH_INFO_2.path)).toEqual(PATH_INFO_2.perimeter);
      expect(pathPerimeter(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.path)).toEqual(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.perimeter);
      expect(pathPerimeter(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.perimeter);
      expect(pathPerimeter(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.perimeter);
      expect(pathPerimeter(PATH_INFO_CONVEX.path)).toEqual(PATH_INFO_CONVEX.perimeter);
      expect(pathPerimeter(PATH_INFO_CONCAVE.path)).toEqual(PATH_INFO_CONCAVE.perimeter);
      expect(pathPerimeter(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.perimeter);
    });
  });
});