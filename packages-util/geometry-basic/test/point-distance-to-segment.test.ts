import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isNearlyEqual,
  pointDistanceToSegment,
  pointDistanceToSegmentDetailed
} from '../src';

describe('pointDistanceToSegment', () => {
  test('pointDistanceToSegment(p: Point, segment: Segment): number', () => {
    expect(pointDistanceToSegment([0, 0], [[0, 0], [1, 1]])).toEqual(0);
    expect(pointDistanceToSegment([5, 0], [[0, 1], [0, 1]])).toEqual(5);
    expect(pointDistanceToSegment([1, 7], [[2, 0], [7, 0]])).toEqual(7);
    expect(isNearlyEqual(pointDistanceToSegment([2, 2], [[0, 2], [2, 0]]), Math.hypot(1, 1))).toBeTruthy();
  });
  
  test('pointDistanceToSegmentDetailed(p: Point, segment: Segment): [number, number, number]', () => {
    expect(pointDistanceToSegmentDetailed([2, 2], [[0, 2], [2, 0]]).slice(1, 3)).toEqual([1, 1]);
    expect(pointDistanceToSegmentDetailed([0, 0], [[0, 2], [2, 0]]).slice(1, 3)).toEqual([-1, -1]);
    expect(pointDistanceToSegmentDetailed([0, 2], [[0, 0], [2, 2]]).slice(1, 3)).toEqual([-1, 1]);
    expect(pointDistanceToSegmentDetailed([2, 0], [[0, 0], [2, 2]]).slice(1, 3)).toEqual([1, -1]);
  });
});