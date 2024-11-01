import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  intersectionSegmentWithLine
} from '../src';

describe('intersectionSegmentWithLine(segment: Segment, line: Line): Point | null', () => {
  const SEGMENT: Segment = [[1, 1], [3, 3]];
  
  test('segment and line are parallel → null', () => {
    expect(intersectionSegmentWithLine(SEGMENT, [1, -1, 0])).toBeNull();
    expect(intersectionSegmentWithLine(SEGMENT, [1, -1, 100])).toBeNull();
  });
  
  test('segment and line are not parallel, but segment not touched by line', () => {
    expect(intersectionSegmentWithLine(SEGMENT, [1, 1, 0])).toBeNull();
  });
  
  test('segment and line are intersected', () => {
    expect(intersectionSegmentWithLine(SEGMENT, [1, 1, -2])).toEqual([1, 1]);
    expect(intersectionSegmentWithLine(SEGMENT, [1, 1, -4])).toEqual([2, 2]);
    expect(intersectionSegmentWithLine(SEGMENT, [1, 1, -6])).toEqual([3, 3]);
  });
});