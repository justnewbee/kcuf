import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentIntersectionWithPathExtended
} from '../src';

import {
  PATH_INFO_CONCAVE,
  PATH_INFO_CONVEX
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('segmentIntersectionWithPathExtended(segment1: Segment, path: Path): Point[]', () => {
    describe('both points are', () => {
      test('inside', () => {
        expect(segmentIntersectionWithPathExtended([[1, 1], [2, 2]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [3, 3]]);
        expect(segmentIntersectionWithPathExtended([[2, 2], [1, 1]], PATH_INFO_CONVEX.path)).toEqual([[3, 3], [0, 0]]);
        expect(segmentIntersectionWithPathExtended([[2, 3], [2, 2]], PATH_INFO_CONVEX.path)).toEqual([[2, 4], [2, 0]]);
        expect(segmentIntersectionWithPathExtended([[2, 2], [2, 3]], PATH_INFO_CONVEX.path)).toEqual([[2, 0], [2, 4]]);
      });
      
      test('outside no crossing', () => {
        expect(segmentIntersectionWithPathExtended([[5, 0], [6, 1]], PATH_INFO_CONVEX.path)).toEqual([]);
      });
      
      test('outside crossing', () => {
        expect(segmentIntersectionWithPathExtended([[-1, -1], [4, 4]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [3, 3]]);
      });
      
      test('path point', () => {
        expect(segmentIntersectionWithPathExtended([[0, 0], [4, 2]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [4, 2]]);
      });
      
      test('along path', () => {
        expect(segmentIntersectionWithPathExtended([[0, 1], [3, 3]], PATH_INFO_CONVEX.path)).toEqual([[0, 1], [3, 3]]);
        expect(segmentIntersectionWithPathExtended([[3, 3], [0, 1]], PATH_INFO_CONVEX.path)).toEqual([[3, 3], [0, 1]]);
      });
    });
    
    describe('one point is path point', () => {
      test('the other inside', () => {
        expect(segmentIntersectionWithPathExtended([[0, 0], [1, 1]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [3, 3]]);
        expect(segmentIntersectionWithPathExtended([[2, 2], [0, 0]], PATH_INFO_CONVEX.path)).toEqual([[3, 3], [0, 0]]);
        expect(segmentIntersectionWithPathExtended([[0, 2], [2, 1]], PATH_INFO_CONVEX.path)).toEqual([[0, 2], [4, 0]]);
        expect(segmentIntersectionWithPathExtended([[4, 0], [2, 1]], PATH_INFO_CONVEX.path)).toEqual([[4, 0], [0, 2]]);
      });
      
      test('the other outside', () => {
        expect(segmentIntersectionWithPathExtended([[2, 4], [2, 5]], PATH_INFO_CONVEX.path)).toEqual([[2, 0], [2, 4]]);
      });
      
      test('the other outside crossing', () => {
        expect(segmentIntersectionWithPathExtended([[0, 0], [4, 4]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [3, 3]]);
      });
    });
    
    describe('one point along path', () => {
      test('the other inside', () => {
        expect(segmentIntersectionWithPathExtended([[2, 0], [3, 1]], PATH_INFO_CONVEX.path)).toEqual([[2, 0], [4, 2]]);
        expect(segmentIntersectionWithPathExtended([[3, 1], [2, 0]], PATH_INFO_CONVEX.path)).toEqual([[4, 2], [2, 0]]);
        expect(segmentIntersectionWithPathExtended([[1, 1], [3, 3]], PATH_INFO_CONVEX.path)).toEqual([[0, 0], [3, 3]]);
        expect(segmentIntersectionWithPathExtended([[3, 3], [1, 1]], PATH_INFO_CONVEX.path)).toEqual([[3, 3], [0, 0]]);
      });
      
      test('the other outside', () => {
        expect(segmentIntersectionWithPathExtended([[2, 0], [6, 2]], PATH_INFO_CONVEX.path)).toEqual([[2, 0], [4, 1]]);
        expect(segmentIntersectionWithPathExtended([[6, 2], [2, 0]], PATH_INFO_CONVEX.path)).toEqual([[4, 1], [2, 0]]);
      });
    });
    
    describe('multiple', () => {
      test(() => {
        expect(segmentIntersectionWithPathExtended([[1, 1], [2, 2]], PATH_INFO_CONCAVE.path)).toEqual([[0, 0], [4, 4]]);
        expect(segmentIntersectionWithPathExtended([[0, 1], [1, 2]], PATH_INFO_CONCAVE.path)).toEqual([[0, 1], [1, 2], [2, 3], [3, 4]]);
        expect(segmentIntersectionWithPathExtended([[0, 2], [2, 4]], PATH_INFO_CONCAVE.path)).toEqual([[0, 2], [2, 4]]);
      });
    });
  });
});