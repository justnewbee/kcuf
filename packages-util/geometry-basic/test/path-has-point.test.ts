import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  pathHasPoint
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH: Path = [
    [0, 1],
    [2, 3],
    [4, 7],
    [3, 4],
    [0, 2]
  ];
  
  describe('pathHasPoint(path: Path, p: Point): boolean', () => {
    test('path has not the point', () => {
      expect(pathHasPoint(PATH, [2, 4])).toBeFalsy();
    });
    
    test('path has the point', () => {
      for (const p of PATH) {
        expect(pathHasPoint(PATH, p)).toBeTruthy();
      }
    });
  });
});