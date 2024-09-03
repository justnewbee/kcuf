import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  segmentIntersectionPoint
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('segmentIntersectionPoint(segment1: Segment, segment2: Segment): Point | null', () => {
    const segment1: Segment = [
      [1, 2],
      [2, 5]
    ];
    const segment2: Segment = [
      [1, 2],
      [3, 4]
    ];
    
    test('Same 2 points', () => {
      expect(segmentIntersectionPoint(segment1, segment1)).toBeNull();
      expect(segmentIntersectionPoint(segment2, segment2)).toBeNull();
    });
    
    test('Parallel', () => {
      expect(segmentIntersectionPoint([[1, 2], [3, 2]], [[3, 5], [6, 5]])).toBeNull();
    });
    
    test('No connection', () => {
      expect(segmentIntersectionPoint([[1, 2], [3, 2]], [[2, 3], [4, 2.5]])).toBeNull();
    });
    
    test('Crossing', () => {
      expect(segmentIntersectionPoint([[1, 2], [3, 2]], [[2, 0], [2, 3]])).toEqual([2, 2]);
    });
  });
});