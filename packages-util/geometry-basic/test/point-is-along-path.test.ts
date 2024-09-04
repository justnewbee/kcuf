import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  pointIsAlongPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  /*
  * 5 ‖
  * 4 ‖          ↙★
  * 3 ‖  ★
  * 2 ‖  ↓        ↑
  * 1 ‖  ★→      ★
  * 0 +--+--+--+--+--+
  *   0  1  2  3  4  5
  */
  const PATH: Path = [[1, 1], [4, 1], [4, 4], [1, 3]];
  
  describe('pointIsAlongPath(point: Point, path: Path): boolean', () => {
    test('vertex', () => {
      PATH.forEach(v => {
        expect(pointIsAlongPath(v, PATH)).toBe(true);
      });
    });
    
    test('non-vertex', () => {
      expect(pointIsAlongPath([2, 1], PATH)).toBe(true);
      expect(pointIsAlongPath([3, 1], PATH)).toBe(true);
      expect(pointIsAlongPath([4, 2], PATH)).toBe(true);
      
      expect(pointIsAlongPath([3, 3], PATH)).toBe(false);
      expect(pointIsAlongPath([1, 5], PATH)).toBe(false);
    });
  });
});