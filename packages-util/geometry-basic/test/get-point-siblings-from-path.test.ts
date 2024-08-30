import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  getPointSiblingsFromPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getPointSiblingsFromPath(path: Path, index: number): [] | [Point] | [Point, Point]', () => {
    test('empty when path length <= 1', () => {
      expect(getPointSiblingsFromPath([], 0)).toEqual([]);
      expect(getPointSiblingsFromPath([[1, 2]], 0)).toEqual([]);
      expect(getPointSiblingsFromPath([[1, 2]], 2)).toEqual([]);
    });
    
    test('empty when index out of bound', () => {
      expect(getPointSiblingsFromPath([[1, 2], [5, 8], [4, 5]], 4)).toEqual([]);
    });
    
    test('one singling only when path length 2', () => {
      const PATH: Path = [[1, 2], [5, 8]];
      
      expect(getPointSiblingsFromPath(PATH, 0)).toEqual([PATH[1]]);
      expect(getPointSiblingsFromPath(PATH, 1)).toEqual([PATH[0]]);
    });
    
    test('two siblings when path length > 2', () => {
      const PATH: Path = [[1, 2], [5, 8], [4, 5], [9, 20]];
      
      expect(getPointSiblingsFromPath(PATH, 0)).toEqual([PATH[PATH.length - 1], PATH[1]]);
      expect(getPointSiblingsFromPath(PATH, 2)).toEqual([PATH[1], PATH[3]]);
      expect(getPointSiblingsFromPath(PATH, PATH.length - 1)).toEqual([PATH[PATH.length - 2], PATH[0]]);
    });
  });
});