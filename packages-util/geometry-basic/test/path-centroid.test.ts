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
  // PATH_INFO_TRIANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE
  // PATH_INFO_CONVEX,
  // PATH_INFO_CONCAVE,
  // PATH_INFO_CROSSING
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
      // expect(pathCentroid(PATH_INFO_TRIANGLE.path)).toEqual(PATH_INFO_TRIANGLE.centroid);
      expect(pathCentroid(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.centroid);
      expect(pathCentroid(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.centroid);
      // expect(pathCentroid(PATH_INFO_CONVEX.path)).toEqual(PATH_INFO_CONVEX.centroid);
      // expect(pathCentroid(PATH_INFO_CONCAVE.path)).toEqual(PATH_INFO_CONCAVE.centroid);
      // expect(pathCentroid(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.centroid); // FIXME
    });
  });
});