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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_4_SQUARE,
  PATH_INFO_4_RECTANGLE,
  PATH_INFO_5_CONVEX,
  PATH_INFO_6_CONCAVE,
  PATH_INFO_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathSegmentList(path: Path): Segment[]', () => {
    test('Path with 0-1', () => {
      expect(pathSegmentList(PATH_INFO_0.path).length).toEqual(0);
      expect(pathSegmentList(PATH_INFO_1.path).length).toEqual(0);
    });
    
    test('Path with 2 points', () => {
      expect(pathSegmentList(PATH_INFO_2.path)).toEqual(PATH_INFO_2.segments);
    });
    
    test('Path with 3+ points', () => {
      expect(pathSegmentList(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.segments);
      expect(pathSegmentList(PATH_INFO_4_SQUARE.path)).toEqual(PATH_INFO_4_SQUARE.segments);
      expect(pathSegmentList(PATH_INFO_4_RECTANGLE.path)).toEqual(PATH_INFO_4_RECTANGLE.segments);
      expect(pathSegmentList(PATH_INFO_5_CONVEX.path)).toEqual(PATH_INFO_5_CONVEX.segments);
      expect(pathSegmentList(PATH_INFO_6_CONCAVE.path)).toEqual(PATH_INFO_6_CONCAVE.segments);
      expect(pathSegmentList(PATH_INFO_4_CROSSING.path)).toEqual(PATH_INFO_4_CROSSING.segments);
    });
  });
});