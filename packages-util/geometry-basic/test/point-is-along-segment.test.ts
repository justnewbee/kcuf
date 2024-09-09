import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  pointIsAlongSegment
} from '../src';

describe('pointIsAlongSegment(point: Point, segment: Segment): boolean', () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('vertex', () => {
    expect(pointIsAlongSegment(SEGMENT[0], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment(SEGMENT[1], SEGMENT)).toBe(true);
  });
  
  test('non-vertex', () => {
    expect(pointIsAlongSegment([2, 2], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(pointIsAlongSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(pointIsAlongSegment([3, 3], SEGMENT)).toBe(true);
  });
});