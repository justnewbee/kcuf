import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentIntersectionWithPath
} from '../src';

import {
  PATH_HOUSE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('segmentIntersectionWithPath(segment1: Segment, path: Path): Point[]', () => {
    describe('both points are', () => {
      test('inside → []', () => {
        expect(segmentIntersectionWithPath([[1, 2], [3, 1]], PATH_HOUSE)).toEqual([]);
        expect(segmentIntersectionWithPath([[1, 1], [3, 2]], PATH_HOUSE)).toEqual([]);
      });
      
      test('outside no crossing', () => {
        expect(segmentIntersectionWithPath([[5, 0], [6, 1]], PATH_HOUSE)).toEqual([]);
      });
      
      test('outside crossing', () => {
        expect(segmentIntersectionWithPath([[-1, -1], [4, 4]], PATH_HOUSE)).toEqual([[0, 0], [3, 3]]);
      });
      
      test('path point', () => {
        expect(segmentIntersectionWithPath([[0, 0], [4, 2]], PATH_HOUSE)).toEqual([[0, 0], [4, 2]]);
      });
      
      test('along path', () => {
        expect(segmentIntersectionWithPath([[0, 1], [3, 3]], PATH_HOUSE)).toEqual([[0, 1], [3, 3]]);
      });
    });
    
    describe('one point is path point', () => {
      test('the other inside', () => {
        expect(segmentIntersectionWithPath([[0, 0], [3, 2]], PATH_HOUSE)).toEqual([[0, 0]]);
      });
      
      test('the other outside', () => {
        expect(segmentIntersectionWithPath([[4, 2], [5, 6]], PATH_HOUSE)).toEqual([[4, 2]]);
      });
      
      test('the other outside crossing', () => {
        expect(segmentIntersectionWithPath([[0, 0], [4, 4]], PATH_HOUSE)).toEqual([[0, 0], [3, 3]]);
      });
    });
    
    describe('one point along path', () => {
      test('the other inside', () => {
        expect(segmentIntersectionWithPath([[0, 1], [2, 2]], PATH_HOUSE)).toEqual([[0, 1]]);
        expect(segmentIntersectionWithPath([[0, 1], [3, 2]], PATH_HOUSE)).toEqual([[0, 1]]);
      });
      
      test('the other outside no crossing', () => {
        expect(segmentIntersectionWithPath([[4, 1], [7, 6]], PATH_HOUSE)).toEqual([[4, 1]]);
      });
      
      test('the other outside crossing', () => {
        expect(segmentIntersectionWithPath([[2, 0], [5, 3]], PATH_HOUSE)).toEqual([[2, 0], [4, 2]]);
      });
    });
  });
});