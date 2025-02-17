import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pointDistanceToSegment
} from '../src';

describe('pointDistanceToSegment(point: Point, segment: Segment): number', () => {
  test('pointDistanceToSegment(p: Point, segment: Segment): number', () => {
    expect(pointDistanceToSegment([0, 0], [[0, 0], [1, 1]])).toEqual(0);
    expect(pointDistanceToSegment([5, 0], [[0, -1], [0, 1]])).toEqual(5);
    expect(pointDistanceToSegment([1, 7], [[2, 0], [7, 0]])).toEqual(7);
    expect(pointDistanceToSegment([2, 2], [[0, 2], [2, 0]])).toBeCloseTo(Math.hypot(1, 1));
  });
});
