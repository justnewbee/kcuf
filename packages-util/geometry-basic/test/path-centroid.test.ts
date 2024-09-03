import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathCentroid
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathCentroid(path: Path): Point | null', () => {
    test('path length 0', () => {
      expect(pathCentroid([])).toBeNull();
    });
    
    test('path length 1', () => {
      expect(pathCentroid([[1, 1]])).toEqual([1, 1]);
      expect(pathCentroid([[1, 2]])).toEqual([1, 2]);
    });
    
    test('path length 2', () => {
      expect(pathCentroid([[1, 1], [2, 2]])).toEqual([1.5, 1.5]);
      expect(pathCentroid([[2, 2], [6, 8]])).toEqual([4, 5]);
    });
    
    test('path length > 2', () => {
      expect(pathCentroid([[0, 0], [6, 0], [6, 4], [0, 4]])).toEqual([3, 2]);
      expect(pathCentroid([[0, 6], [6, 0], [3, 9]])).toEqual([3, 5]);
    });
  });
});