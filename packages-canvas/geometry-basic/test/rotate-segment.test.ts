import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  Segment,
  rotateSegment
} from '../src';

describe('rotateSegment(segment: Segment, pivot: Point, radians: number): Segment', () => {
  const S: Segment = [[1, 0], [2, 0]];
  const PIVOT: Point = [0, 0];
  
  test('±0', () => {
    expect(rotateSegment(S, PIVOT, 0)).toEqual(S);
    expect(rotateSegment(S, PIVOT, -0)).toEqual(S);
  });
  
  test('±π/2', () => {
    expect(rotateSegment(S, PIVOT, Math.PI / 2)).toEqual([[0, 1], [0, 2]]);
    expect(rotateSegment(S, PIVOT, -Math.PI / 2)).toEqual([[0, -1], [0, -2]]);
  });
  
  test('±π', () => {
    expect(rotateSegment(S, PIVOT, Math.PI)).toEqual([[-1, 0], [-2, 0]]);
    expect(rotateSegment(S, PIVOT, -Math.PI)).toEqual([[-1, -0], [-2, -0]]);
  });
  
  test('±π3π/2', () => {
    expect(rotateSegment(S, PIVOT, 3 * Math.PI / 2)).toEqual([[-0, -1], [-0, -2]]);
    expect(rotateSegment(S, PIVOT, -3 * Math.PI / 2)).toEqual([[-0, 1], [-0, 2]]);
  });
  
  test('±2π', () => {
    expect(rotateSegment(S, PIVOT, 2 * Math.PI)).toEqual([[1, -0], [2, -0]]);
    expect(rotateSegment(S, PIVOT, -2 * Math.PI)).toEqual(S);
  });
});
