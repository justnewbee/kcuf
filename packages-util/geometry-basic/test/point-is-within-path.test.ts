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
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pointIsWithinPath(point: Point, path: Path): boolean', () => {
    test('external', () => {
      expect(pointIsWithinPath([0, 5], TEST_PATH_4_RECTANGLE.path)).toBe(false);
      expect(pointIsWithinPath([5, 0], TEST_PATH_4_RECTANGLE.path)).toBe(false);
      expect(pointIsWithinPath([3, 4], TEST_PATH_4_RECTANGLE.path)).toBe(false);
    });
    
    test('within', () => {
      expect(pointIsWithinPath([1, 1], TEST_PATH_4_SQUARE.path)).toBe(true);
      expect(pointIsWithinPath([1, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
      expect(pointIsWithinPath([2, 2], TEST_PATH_4_SQUARE.path)).toBe(true);
    });
    
    test('the points → false', () => {
      TEST_PATH_4_RECTANGLE.path.forEach(v => {
        expect(pointIsWithinPath(v, TEST_PATH_4_RECTANGLE.path)).toBe(false);
      });
    });
    
    test('along border → false', () => {
      expect(pointIsWithinPath([0, 1], TEST_PATH_4_SQUARE.path)).toBe(false);
      expect(pointIsWithinPath([1, 0], TEST_PATH_4_SQUARE.path)).toBe(false);
      expect(pointIsWithinPath([4, 1], TEST_PATH_4_SQUARE.path)).toBe(false);
    });
  });
});