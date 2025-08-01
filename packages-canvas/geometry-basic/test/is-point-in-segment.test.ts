import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  isPointInSegment
} from '../src';

describe('isPointInSegment(point: Point, segment: Segment): boolean', () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('vertex', () => {
    expect(isPointInSegment(SEGMENT[0], SEGMENT)).toBe(false);
    expect(isPointInSegment(SEGMENT[1], SEGMENT)).toBe(false);
  });
  
  test('non-vertex', () => {
    expect(isPointInSegment([2, 2], SEGMENT)).toBe(true);
    expect(isPointInSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(isPointInSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(isPointInSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(isPointInSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(isPointInSegment([3, 3], SEGMENT)).toBe(true);
  });
});
