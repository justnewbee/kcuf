import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  segmentIntersectionWithLine
} from '../src';

describe('segmentIntersectionWithLine(segment: Segment, line: Line): Point | null', () => {
  const SEGMENT: Segment = [[1, 1], [3, 3]];
  
  test('segment and line are parallel → null', () => {
    expect(segmentIntersectionWithLine(SEGMENT, [1, -1, 0])).toBeNull();
    expect(segmentIntersectionWithLine(SEGMENT, [1, -1, 100])).toBeNull();
  });
  
  test('segment and line are not parallel, but segment not touched by line', () => {
    expect(segmentIntersectionWithLine(SEGMENT, [1, 1, 0])).toBeNull();
  });
  
  test('segment and line are intersected', () => {
    expect(segmentIntersectionWithLine(SEGMENT, [1, 1, -2])).toEqual([1, 1]);
    expect(segmentIntersectionWithLine(SEGMENT, [1, 1, -4])).toEqual([2, 2]);
    expect(segmentIntersectionWithLine(SEGMENT, [1, 1, -6])).toEqual([3, 3]);
  });
});