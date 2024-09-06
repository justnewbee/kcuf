import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentInnerSliceListByPath,
  segmentInnerSliceTotalLengthByPath
} from '../src';

import {
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('segmentInnerSliceListByPath(segment1: Segment, path: Path): Point[]', () => {
    describe('Convex polygon（凸多边形）', () => {
      describe('both points are', () => {
        test('inside', () => {
          expect(segmentInnerSliceListByPath([[1, 2], [3, 1]], TEST_PATH_5_CONVEX.path)).toEqual([[[1, 2], [3, 1]]]);
          expect(segmentInnerSliceTotalLengthByPath([[1, 2], [3, 1]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(1, 2));
          expect(segmentInnerSliceListByPath([[1, 1], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual([[[1, 1], [3, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[1, 1], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(2, 1));
        });
        
        test('outside no crossing', () => {
          expect(segmentInnerSliceListByPath([[5, 0], [6, 1]], TEST_PATH_5_CONVEX.path)).toEqual([]);
          expect(segmentInnerSliceTotalLengthByPath([[5, 0], [6, 1]], TEST_PATH_5_CONVEX.path)).toEqual(0);
        });
        
        test('outside crossing', () => {
          expect(segmentInnerSliceListByPath([[-1, -1], [4, 4]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 0], [3, 3]]]);
          expect(segmentInnerSliceTotalLengthByPath([[-1, -1], [4, 4]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(3, 3));
        });
        
        test('path point', () => {
          expect(segmentInnerSliceListByPath([[0, 0], [4, 2]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 0], [4, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 0], [4, 2]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(4, 2));
        });
        
        test('along path', () => {
          expect(segmentInnerSliceListByPath([[0, 1], [3, 3]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 1], [3, 3]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 1], [3, 3]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(3, 2));
        });
      });
      
      describe('one point is path point', () => {
        test('the other inside', () => {
          expect(segmentInnerSliceListByPath([[0, 0], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 0], [3, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 0], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(3, 2));
        });
        
        test('the other outside', () => {
          expect(segmentInnerSliceListByPath([[4, 2], [5, 6]], TEST_PATH_5_CONVEX.path)).toEqual([]);
          expect(segmentInnerSliceTotalLengthByPath([[4, 2], [5, 6]], TEST_PATH_5_CONVEX.path)).toEqual(0);
        });
        
        test('the other outside crossing', () => {
          expect(segmentInnerSliceListByPath([[0, 0], [4, 4]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 0], [3, 3]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 0], [4, 4]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(3, 3));
        });
      });
      
      describe('one point along path', () => {
        test('the other inside', () => {
          expect(segmentInnerSliceListByPath([[0, 1], [2, 2]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 1], [2, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 1], [2, 2]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(2, 1));
        });
        
        test('the other outside no crossing', () => {
          expect(segmentInnerSliceListByPath([[4, 1], [7, 6]], TEST_PATH_5_CONVEX.path)).toEqual([]);
          expect(segmentInnerSliceTotalLengthByPath([[4, 1], [7, 6]], TEST_PATH_5_CONVEX.path)).toEqual(0);
        });
        
        test('the other outside crossing', () => {
          expect(segmentInnerSliceListByPath([[2, 0], [5, 3]], TEST_PATH_5_CONVEX.path)).toEqual([[[2, 0], [4, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[2, 0], [5, 3]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(2, 2));
        });
        
        test('the other inside', () => {
          expect(segmentInnerSliceListByPath([[0, 1], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual([[[0, 1], [3, 2]]]);
          expect(segmentInnerSliceTotalLengthByPath([[0, 1], [3, 2]], TEST_PATH_5_CONVEX.path)).toEqual(Math.hypot(3, 1));
        });
      });
    });
    
    describe('Concave polygon（凹多边形）', () => {
      describe('both points are', () => {
        test('inside', () => {
          expect(segmentInnerSliceListByPath([[2.5, 0.5], [3, 1]], TEST_PATH_6_CONCAVE.path)).toEqual([[[2.5, 0.5], [3, 1]]]);
          expect(segmentInnerSliceTotalLengthByPath([[2.5, 0.5], [3, 1]], TEST_PATH_6_CONCAVE.path)).toEqual(Math.hypot(0.5, 0.5));
        });
        
        test('outside no crossing', () => {
          expect(segmentInnerSliceListByPath([[5, 0], [6, 1]], TEST_PATH_6_CONCAVE.path)).toEqual([]);
          expect(segmentInnerSliceTotalLengthByPath([[5, 0], [6, 1]], TEST_PATH_6_CONCAVE.path)).toEqual(0);
        });
        
        test('outside crossing', () => {
          expect(segmentInnerSliceListByPath([[-1, -1], [5, 5]], TEST_PATH_6_CONCAVE.path)).toEqual([[[0, 0], [4, 4]]]);
          expect(segmentInnerSliceListByPath([[-1, 0], [4, 5]], TEST_PATH_6_CONCAVE.path)).toEqual([[[0, 1], [1, 2]], [[2, 3], [3, 4]]]);
          expect(segmentInnerSliceListByPath([[1, 4], [5, 0]], TEST_PATH_6_CONCAVE.path)).toEqual([[[2, 3], [4, 1]]]);
        });
        
        test('path point', () => {
          expect(segmentInnerSliceListByPath([[0, 2], [2, 4]], TEST_PATH_6_CONCAVE.path)).toEqual([]);
          expect(segmentInnerSliceListByPath([[2, 4], [0, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([]);
          
          expect(segmentInnerSliceListByPath([[2, 4], [4, 0]], TEST_PATH_6_CONCAVE.path)).toEqual([[[2, 4], [4, 0]]]);
          expect(segmentInnerSliceListByPath([[0, 0], [2, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([[[0, 0], [2, 2]]]);
          expect(segmentInnerSliceListByPath([[2, 2], [0, 0]], TEST_PATH_6_CONCAVE.path)).toEqual([[[2, 2], [0, 0]]]);
        });
        
        test('along path', () => {
          expect(segmentInnerSliceListByPath([[2, 0], [4, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([[[2, 0], [4, 2]]]);
        });
      });
      
      describe('one point is path point', () => {
        test('the other inside', () => {
          expect(segmentInnerSliceListByPath([[0, 0], [3, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([[[0, 0], [3, 2]]]);
        });
        
        test('the other outside', () => {
          expect(segmentInnerSliceListByPath([[4, 2], [5, 6]], TEST_PATH_6_CONCAVE.path)).toEqual([]);
        });

        test('the other outside crossing', () => {
          expect(segmentInnerSliceListByPath([[0, 0], [8, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([[[0, 0], [4, 1]]]);
        });
      });

      describe('one point along path', () => {
        test('the other inside', () => {
          expect(segmentInnerSliceListByPath([[4, 4], [3, 2]], TEST_PATH_6_CONCAVE.path)).toEqual([[[4, 4], [3, 2]]]);
          expect(segmentInnerSliceListByPath([[3, 2], [4, 4]], TEST_PATH_6_CONCAVE.path)).toEqual([[[3, 2], [4, 4]]]);
        });

        test('the other outside no crossing', () => {
          expect(segmentInnerSliceListByPath([[2, 4], [7, 6]], TEST_PATH_6_CONCAVE.path)).toEqual([]);
        });

        test('the other outside crossing', () => {
          expect(segmentInnerSliceListByPath([[1, 0], [5, 4]], TEST_PATH_6_CONCAVE.path)).toEqual([[[1, 0], [4, 3]]]);
        });
      });
    });
  });
});