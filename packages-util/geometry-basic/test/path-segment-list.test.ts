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
  PATH_INFO_ISOSCELES_RIGHT_TRIANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_CONVEX_POLYGON,
  PATH_INFO_CONCAVE_POLYGON
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
      expect(pathSegmentList(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.path)).toEqual(PATH_INFO_ISOSCELES_RIGHT_TRIANGLE.segments);
      expect(pathSegmentList(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.segments);
      expect(pathSegmentList(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.segments);
      expect(pathSegmentList(PATH_INFO_CONVEX_POLYGON.path)).toEqual(PATH_INFO_CONVEX_POLYGON.segments);
      expect(pathSegmentList(PATH_INFO_CONCAVE_POLYGON.path)).toEqual(PATH_INFO_CONCAVE_POLYGON.segments);
    });
  });
});