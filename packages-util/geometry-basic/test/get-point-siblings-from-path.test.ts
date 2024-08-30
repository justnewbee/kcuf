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
    const PATH_1: Path = [[1, 2]];
    const PATH_2: Path = [[1, 2], [5, 8]];
    const PATH_3: Path = [[1, 2], [5, 8], [4, 5]];
    const PATH4: Path = [[1, 2], [5, 8], [4, 5], [9, 20]];
    
    test('empty when path length <= 1', () => {
      expect(getPointSiblingsFromPath([], 0)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_1, 0)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_1, -1)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_1, 2)).toEqual([]);
    });
    
    test('empty when index out of bound', () => {
      expect(getPointSiblingsFromPath(PATH_2, -1)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_3, -2)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_2, -3)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_3, -4)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_2, 3)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_3, 4)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_2, 30)).toEqual([]);
      expect(getPointSiblingsFromPath(PATH_3, 40)).toEqual([]);
    });
    
    test('one singling only when path length 2', () => {
      expect(getPointSiblingsFromPath(PATH_2, 0)).toEqual([PATH_2[1]]);
      expect(getPointSiblingsFromPath(PATH_2, 1)).toEqual([PATH_2[0]]);
    });
    
    test('two siblings when path length > 2', () => {
      expect(getPointSiblingsFromPath(PATH4, 0)).toEqual([PATH4[PATH4.length - 1], PATH4[1]]);
      expect(getPointSiblingsFromPath(PATH4, 2)).toEqual([PATH4[1], PATH4[3]]);
      expect(getPointSiblingsFromPath(PATH4, PATH4.length - 1)).toEqual([PATH4[PATH4.length - 2], PATH4[0]]);
    });
  });
});