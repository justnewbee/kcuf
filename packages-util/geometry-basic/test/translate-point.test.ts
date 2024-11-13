import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  translatePoint
} from '../src';

describe('translatePoint(point: Point, dxy: [number, number]): Point', () => {
  const P: Point = [1, 3];
  
  test('will not mutate', () => {
    expect(translatePoint(P, [0, 0])).toEqual(P);
    expect(translatePoint(P, [0, 0]) === P).toBe(false);
  });
  
  test('will translate right', () => {
    expect(translatePoint(P, [1, 1])).toEqual([2, 4]);
    expect(translatePoint(P, [0, 1])).toEqual([1, 4]);
    expect(translatePoint(P, [-1, 1])).toEqual([0, 4]);
    expect(translatePoint(P, [-1, -1])).toEqual([0, 2]);
  });
});
