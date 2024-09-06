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
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_DIAMOND
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX,
  // TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathCentroid(path: Path): Point | null', () => {
    test('path length 0', () => {
      expect(pathCentroid(TEST_PATH_0.path)).toBeNull();
    });
    
    test('path length 1', () => {
      expect(pathCentroid(TEST_PATH_1.path)).toEqual(TEST_PATH_1.centroid);
    });
    
    test('path length 2', () => {
      expect(pathCentroid(TEST_PATH_2.path)).toEqual(TEST_PATH_2.centroid);
    });
    
    test('path length > 2', () => {
      expect(pathCentroid(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.centroid);
      expect(pathCentroid(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.centroid);
      expect(pathCentroid(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.centroid);
      expect(pathCentroid(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.centroid);
      expect(pathCentroid(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.centroid);
      // expect(pathCentroid(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.centroid);
      // expect(pathCentroid(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.centroid);
      // expect(pathCentroid(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.centroid);
    });
  });
});