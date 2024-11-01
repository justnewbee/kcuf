import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  isEqualPoints
} from '../src';

describe('isEqualPoints(p1: Point, p2: Point): boolean', () => {
  const P1: Point = [1, 2];
  const P2: Point = [4, 7];
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const P3: Point = [36 / 8.999999999999999, 0.28 / 4 * 100]; // 4.000000000000001, 7.000000000000001
  
  test(() => {
    expect(isEqualPoints(P1, P1)).toBe(true);
    expect(isEqualPoints(P1, P2)).toBe(false);
    expect(isEqualPoints(P2, P3)).toBe(true);
  });
});