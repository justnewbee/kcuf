import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathIntersectionWithSegment
} from '../src';

import {
  // PATH_INFO_0,
  // PATH_INFO_1,
  // PATH_INFO_2,
  // PATH_INFO_3_REGULAR,
  // PATH_INFO_3_ISOSCELES_RIGHT,
  // PATH_INFO_4_RECTANGLE,
  // PATH_INFO_4_SQUARE,
  // PATH_INFO_4_DIAMOND,
  // PATH_INFO_4_CROSSING,
  PATH_INFO_5_CONVEX
  // PATH_INFO_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathIntersectionWithSegment(segment1: Segment, path: Path, extended?: boolean): Point[]', () => {
    describe('both points are', () => {
      test('inside', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[1, 2], [3, 1]])).toEqual([]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[1, 1], [3, 2]])).toEqual([]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[1, 1], [2, 2]])).toEqual([]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[1, 1], [2, 2]], true)).toEqual([[0, 0], [3, 3]]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[3, 1], [2, 2]], true)).toEqual([[4, 0], [1, 3]]);
      });
      
      test('outside no crossing', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[5, 0], [6, 1]])).toEqual([]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[5, 3], [6, 4]])).toEqual([]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[5, 0], [6, 1]], true)).toEqual([]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[5, 3], [6, 4]], true)).toEqual([[2, 0], [4, 2]]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[6, 4], [5, 3]], true)).toEqual([[4, 2], [2, 0]]);
      });
      
      test('outside crossing through', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[-1, -1], [4, 4]])).toEqual([[0, 0], [3, 3]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[-1, -1], [4, 4]], true)).toEqual([[0, 0], [3, 3]]);
      });
      
      test('path point', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [4, 2]])).toEqual([[0, 0], [4, 2]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [4, 2]], true)).toEqual([[0, 0], [4, 2]]);
      });
      
      test('along border', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 1], [3, 3]])).toEqual([[0, 1], [3, 3]]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 1], [3, 3]], true)).toEqual([[0, 1], [3, 3]]);
      });
    });
    
    describe('one point is path point', () => {
      test('the other inside', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [2, 2]])).toEqual([[0, 0]]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 2], [3, 1]])).toEqual([[4, 2]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [2, 2]], true)).toEqual([[0, 0], [3, 3]]);
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 2], [3, 1]], true)).toEqual([[4, 2], [2, 0]]);
      });
      
      test('the other outside', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 2], [5, 3]])).toEqual([[4, 2]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 2], [5, 3]], true)).toEqual([[2, 0], [4, 2]]);
      });
      
      test('the other outside crossing', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [4, 4]])).toEqual([[0, 0], [3, 3]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 0], [4, 4]], true)).toEqual([[0, 0], [3, 3]]);
      });
    });
    
    describe('one point along path', () => {
      test('the other inside', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 1], [2, 3]])).toEqual([[0, 1]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[0, 1], [2, 3]], true)).toEqual([[0, 1], [2.5, 3.5]]);
      });
      
      test('the other outside no crossing', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 1], [5, 2]])).toEqual([[4, 1]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[4, 1], [5, 2]], true)).toEqual([[3, 0], [4, 1]]);
      });
      
      test('the other outside crossing', () => {
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[2, 0], [5, 3]])).toEqual([[2, 0], [4, 2]]);
        
        // extended
        expect(pathIntersectionWithSegment(PATH_INFO_5_CONVEX.path, [[2, 0], [5, 3]], true)).toEqual([[2, 0], [4, 2]]);
      });
    });
  });
});