import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathCentroid
} from '../src';

import {
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_REGULAR,
  // PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_4_SQUARE,
  PATH_INFO_4_RECTANGLE,
  PATH_INFO_4_DIAMOND
  // PATH_INFO_4_CROSSING,
  // PATH_INFO_5_CONVEX,
  // PATH_INFO_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathCentroid(path: Path): Point | null', () => {
    test('path length 0', () => {
      expect(pathCentroid(PATH_INFO_0.path)).toBeNull();
    });
    
    test('path length 1', () => {
      expect(pathCentroid(PATH_INFO_1.path)).toEqual(PATH_INFO_1.centroid);
    });
    
    test('path length 2', () => {
      expect(pathCentroid(PATH_INFO_2.path)).toEqual(PATH_INFO_2.centroid);
    });
    
    test('path length > 2', () => {
      expect(pathCentroid(PATH_INFO_3_REGULAR.path)).toEqual(PATH_INFO_3_REGULAR.centroid);
      // expect(pathCentroid(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.centroid);
      expect(pathCentroid(PATH_INFO_4_SQUARE.path)).toEqual(PATH_INFO_4_SQUARE.centroid);
      expect(pathCentroid(PATH_INFO_4_RECTANGLE.path)).toEqual(PATH_INFO_4_RECTANGLE.centroid);
      expect(pathCentroid(PATH_INFO_4_DIAMOND.path)).toEqual(PATH_INFO_4_DIAMOND.centroid);
      // expect(pathCentroid(PATH_INFO_4_CROSSING.path)).toEqual(PATH_INFO_4_CROSSING.centroid);
      // expect(pathCentroid(PATH_INFO_5_CONVEX.path)).toEqual(PATH_INFO_5_CONVEX.centroid);
      // expect(pathCentroid(PATH_INFO_6_CONCAVE.path)).toEqual(PATH_INFO_6_CONCAVE.centroid);
    });
  });
});