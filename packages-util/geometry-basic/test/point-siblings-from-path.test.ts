import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointSiblingsFromPath
} from '../src';

import {
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_3_REGULAR,
  PATH_INFO_RECTANGLE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pointSiblingsFromPath(path: Path, index: number): [] | [Point] | [Point, Point]', () => {
    test('empty when path length <= 1', () => {
      expect(pointSiblingsFromPath(PATH_INFO_0.path, 0)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_1.path, 0)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_1.path, -1)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_1.path, 2)).toEqual([]);
    });
    
    test('empty when index out of bound', () => {
      expect(pointSiblingsFromPath(PATH_INFO_0.path, -1)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_1.path, -2)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_2.path, -3)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_3_ISOSCELES_RIGHT.path, -4)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_2.path, 3)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_2.path, 4)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_2.path, 30)).toEqual([]);
      expect(pointSiblingsFromPath(PATH_INFO_3_REGULAR.path, 40)).toEqual([]);
    });
    
    test('one singling only when path length 2', () => {
      expect(pointSiblingsFromPath(PATH_INFO_2.path, 0)).toEqual([PATH_INFO_2.path[1]]);
      expect(pointSiblingsFromPath(PATH_INFO_2.path, 1)).toEqual([PATH_INFO_2.path[0]]);
    });
    
    test('two siblings when path length > 2', () => {
      expect(pointSiblingsFromPath(PATH_INFO_RECTANGLE.path, 0)).toEqual([PATH_INFO_RECTANGLE.path[PATH_INFO_RECTANGLE.path.length - 1], PATH_INFO_RECTANGLE.path[1]]);
      expect(pointSiblingsFromPath(PATH_INFO_RECTANGLE.path, 2)).toEqual([PATH_INFO_RECTANGLE.path[1], PATH_INFO_RECTANGLE.path[3]]);
      expect(pointSiblingsFromPath(PATH_INFO_RECTANGLE.path, PATH_INFO_RECTANGLE.path.length - 1)).toEqual([PATH_INFO_RECTANGLE.path[PATH_INFO_RECTANGLE.path.length - 2], PATH_INFO_RECTANGLE.path[0]]);
    });
  });
});