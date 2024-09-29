import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  isPointAlongSegment
} from '../src';

describe('isPointAlongSegment(point: Point, segment: Segment): boolean', () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('vertex', () => {
    expect(isPointAlongSegment(SEGMENT[0], SEGMENT)).toBe(true);
    expect(isPointAlongSegment(SEGMENT[1], SEGMENT)).toBe(true);
  });
  
  test('non-vertex', () => {
    expect(isPointAlongSegment([2, 2], SEGMENT)).toBe(true);
    expect(isPointAlongSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(isPointAlongSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(isPointAlongSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(isPointAlongSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(isPointAlongSegment([3, 3], SEGMENT)).toBe(true);
  });
});