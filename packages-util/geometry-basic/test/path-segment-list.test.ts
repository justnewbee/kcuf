import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathSegmentList
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE,
  TEST_PATH_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathSegmentList(path: Path): Segment[]', () => {
    test('Path with 0-1', () => {
      expect(pathSegmentList(TEST_PATH_0.path).length).toEqual(0);
      expect(pathSegmentList(TEST_PATH_1.path).length).toEqual(0);
    });
    
    test('Path with 2 points', () => {
      expect(pathSegmentList(TEST_PATH_2.path)).toEqual(TEST_PATH_2.segments);
    });
    
    test('Path with 3+ points', () => {
      expect(pathSegmentList(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.segments);
      expect(pathSegmentList(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.segments);
      expect(pathSegmentList(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.segments);
      expect(pathSegmentList(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.segments);
      expect(pathSegmentList(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.segments);
      expect(pathSegmentList(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.segments);
    });
  });
});