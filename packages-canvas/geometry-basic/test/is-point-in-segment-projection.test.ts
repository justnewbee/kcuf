import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  isPointInSegmentProjection
} from '../src';

describe('isPointInSegmentProjection', () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  describe('isPointInSegmentProjection(p: Point, segment: Segment): boolean', () => {
    test('point in segment projection', () => {
      expect(isPointInSegmentProjection([2, 2], SEGMENT)).toBe(true);
      expect(isPointInSegmentProjection([2, 3], SEGMENT)).toBe(true);
      expect(isPointInSegmentProjection([3, 2], SEGMENT)).toBe(true);
    });
    
    test('point NOT in segment projection', () => {
      expect(isPointInSegmentProjection([0, 5], SEGMENT)).toBe(false);
      expect(isPointInSegmentProjection([1, 5], SEGMENT)).toBe(false);
      expect(isPointInSegmentProjection([2, 5], SEGMENT)).toBe(false);
      expect(isPointInSegmentProjection([5, 1], SEGMENT)).toBe(false);
      expect(isPointInSegmentProjection([5, 2], SEGMENT)).toBe(false);
    });
  });
});
