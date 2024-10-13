import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  isPointOnSegment
} from '../src';

describe('isPointOnSegment(point: Point, segment: Segment): boolean', () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('vertex', () => {
    expect(isPointOnSegment(SEGMENT[0], SEGMENT)).toBe(true);
    expect(isPointOnSegment(SEGMENT[1], SEGMENT)).toBe(true);
  });
  
  test('non-vertex', () => {
    expect(isPointOnSegment([2, 2], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(isPointOnSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(isPointOnSegment([3, 3], SEGMENT)).toBe(true);
  });
});