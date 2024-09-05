import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointIsIncluded
} from '../src';

import {
  PATH_INFO_TRIANGLE,
  PATH_INFO_SQUARE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pointIsIncluded(path: Path, p: Point): boolean', () => {
    test('path has the point', () => {
      PATH_INFO_SQUARE.path.forEach(v => {
        expect(pointIsIncluded(v, PATH_INFO_SQUARE.path)).toBe(true);
      });
    });
    
    test('path has NOT the point', () => {
      expect(pointIsIncluded([0, 1], PATH_INFO_TRIANGLE.path)).toBe(false);
      expect(pointIsIncluded([1, 0], PATH_INFO_TRIANGLE.path)).toBe(false);
      expect(pointIsIncluded([1, 1], PATH_INFO_TRIANGLE.path)).toBe(false);
      expect(pointIsIncluded([2, 2], PATH_INFO_TRIANGLE.path)).toBe(false);
    });
  });
});