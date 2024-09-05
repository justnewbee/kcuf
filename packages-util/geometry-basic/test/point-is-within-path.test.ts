import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointIsWithinPath
} from '../src';

import {
  PATH_INFO_RECTANGLE,
  PATH_INFO_SQUARE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pointIsWithinPath(point: Point, path: Path): boolean', () => {
    test('external', () => {
      expect(pointIsWithinPath([0, 5], PATH_INFO_RECTANGLE.path)).toBe(false);
      expect(pointIsWithinPath([5, 0], PATH_INFO_RECTANGLE.path)).toBe(false);
      expect(pointIsWithinPath([3, 4], PATH_INFO_RECTANGLE.path)).toBe(false);
    });
    
    test('within', () => {
      expect(pointIsWithinPath([1, 1], PATH_INFO_SQUARE.path)).toBe(true);
      expect(pointIsWithinPath([1, 2], PATH_INFO_SQUARE.path)).toBe(true);
      expect(pointIsWithinPath([2, 2], PATH_INFO_SQUARE.path)).toBe(true);
    });
    
    test('the points → false', () => {
      PATH_INFO_RECTANGLE.path.forEach(v => {
        expect(pointIsWithinPath(v, PATH_INFO_RECTANGLE.path)).toBe(false);
      });
    });
    
    test('along border → false', () => {
      expect(pointIsWithinPath([0, 1], PATH_INFO_SQUARE.path)).toBe(false);
      expect(pointIsWithinPath([1, 0], PATH_INFO_SQUARE.path)).toBe(false);
      expect(pointIsWithinPath([4, 1], PATH_INFO_SQUARE.path)).toBe(false);
    });
  });
});