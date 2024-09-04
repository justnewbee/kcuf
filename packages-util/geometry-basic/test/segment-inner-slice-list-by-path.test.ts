import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  segmentInnerSliceListByPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  /*
   * 5 ‖
   * 4 ‖      ★
   * 3 ‖  ↙       ↖
   * 2 ★           ★
   * 1 ↓            ↑
   * 0 ★→-+--+--+--★--+
   *   0  1  2  3  4  5
   */
  const PATH: Path = [
    [0, 0],
    [4, 0],
    [4, 2],
    [2, 4],
    [0, 2]
  ];
  
  describe('segmentInnerSliceListByPath(segment1: Segment, path: Path): Point[]', () => {
    describe('both points are', () => {
      test('inside', () => {
        expect(segmentInnerSliceListByPath([[1, 2], [3, 1]], PATH)).toEqual([[[1, 2], [3, 1]]]);
        expect(segmentInnerSliceListByPath([[1, 1], [3, 2]], PATH)).toEqual([[[1, 1], [3, 2]]]);
      });
      
      test('outside no crossing', () => {
        expect(segmentInnerSliceListByPath([[5, 0], [6, 1]], PATH)).toEqual([]);
      });
      
      test('outside crossing', () => {
        expect(segmentInnerSliceListByPath([[-1, -1], [4, 4]], PATH)).toEqual([[[0, 0], [3, 3]]]);
      });
      
      test('path point', () => {
        expect(segmentInnerSliceListByPath([[0, 0], [4, 2]], PATH)).toEqual([[[0, 0], [4, 2]]]);
      });
      
      test('along path', () => {
        expect(segmentInnerSliceListByPath([[0, 1], [3, 3]], PATH)).toEqual([[[0, 1], [3, 3]]]);
      });
    });
    
    describe('one point is path point', () => {
      test('the other inside', () => {
        expect(segmentInnerSliceListByPath([[0, 0], [3, 2]], PATH)).toEqual([[[0, 0], [3, 2]]]);
      });

      test('the other outside', () => {
        expect(segmentInnerSliceListByPath([[4, 2], [5, 6]], PATH)).toEqual([]);
      });

      test('the other outside crossing', () => {
        expect(segmentInnerSliceListByPath([[0, 0], [4, 4]], PATH)).toEqual([[[0, 0], [3, 3]]]);
      });
    });
    
    describe('one point along path', () => {
      test('the other inside', () => {
        expect(segmentInnerSliceListByPath([[0, 1], [2, 2]], PATH)).toEqual([[[0, 1], [2, 2]]]);
      });

      test('the other outside no crossing', () => {
        expect(segmentInnerSliceListByPath([[4, 1], [7, 6]], PATH)).toEqual([]);
      });

      test('the other outside crossing', () => {
        expect(segmentInnerSliceListByPath([[2, 0], [5, 3]], PATH)).toEqual([[[2, 0], [4, 2]]]);
      });

      test('the other inside', () => {
        expect(segmentInnerSliceListByPath([[0, 1], [3, 2]], PATH)).toEqual([[[0, 1], [3, 2]]]);
      });
    });
  });
});