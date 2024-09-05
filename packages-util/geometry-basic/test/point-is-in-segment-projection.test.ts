import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  pointIsInSegmentProjection
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  describe('pointIsInSegmentProjection(p: Point, segment: Segment): boolean', () => {
    test('point in segment projection', () => {
      expect(pointIsInSegmentProjection([2, 2], SEGMENT)).toBe(true);
      expect(pointIsInSegmentProjection([2, 3], SEGMENT)).toBe(true);
      expect(pointIsInSegmentProjection([3, 2], SEGMENT)).toBe(true);
    });
    
    test('point NOT in segment projection', () => {
      expect(pointIsInSegmentProjection([0, 5], SEGMENT)).toBe(false);
      expect(pointIsInSegmentProjection([1, 5], SEGMENT)).toBe(false);
      expect(pointIsInSegmentProjection([2, 5], SEGMENT)).toBe(false);
      expect(pointIsInSegmentProjection([5, 1], SEGMENT)).toBe(false);
      expect(pointIsInSegmentProjection([5, 2], SEGMENT)).toBe(false);
    });
  });
});