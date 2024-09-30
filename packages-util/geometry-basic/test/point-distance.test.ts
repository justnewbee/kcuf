import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pointDistance
} from '../src';

describe('pointDistance(point1: Point, point2: Point): number', () => {
  test(() => {
    expect(pointDistance([0, 0], [0, 0])).toEqual(0);
    expect(pointDistance([0, 0], [0, 1])).toEqual(1);
    expect(pointDistance([0, 0], [1, 0])).toEqual(1);
    expect(pointDistance([1, 0], [0, 1])).toEqual(Math.hypot(1, 1));
    expect(pointDistance([0, 0], [1, 1])).toEqual(Math.hypot(1, 1));
  });
});