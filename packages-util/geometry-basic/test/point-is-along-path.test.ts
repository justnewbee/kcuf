import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointIsAlongPath
} from '../src';

import {
  PATH_INFO_ISOSCELES_RIGHT_TRIANGLE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_SQUARE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pointIsAlongPath(point: Point, path: Path): boolean', () => {
    test('vertex', () => {
      PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.path.forEach(v => {
        expect(pointIsAlongPath(v, PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.path)).toBe(true);
      });
      
      PATH_INFO_RECTANGLE.path.forEach(v => {
        expect(pointIsAlongPath(v, PATH_INFO_RECTANGLE.path)).toBe(true);
      });
    });
    
    test('non-vertex', () => {
      expect(pointIsAlongPath([0, 1], PATH_INFO_SQUARE.path)).toBe(true);
      expect(pointIsAlongPath([1, 0], PATH_INFO_SQUARE.path)).toBe(true);
      expect(pointIsAlongPath([0, 2], PATH_INFO_SQUARE.path)).toBe(true);
      expect(pointIsAlongPath([2, 0], PATH_INFO_SQUARE.path)).toBe(true);
      
      expect(pointIsAlongPath([1, 2], PATH_INFO_SQUARE.path)).toBe(false);
      expect(pointIsAlongPath([2, 2], PATH_INFO_SQUARE.path)).toBe(false);
      expect(pointIsAlongPath([2, 3], PATH_INFO_SQUARE.path)).toBe(false);
    });
  });
});