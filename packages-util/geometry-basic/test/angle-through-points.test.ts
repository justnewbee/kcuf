import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleThroughPoints
} from '../src';

describe('angleThroughPoints(pointStart: Point, pointMid: Point, pointEnd: Point): number', () => {
  test('0°', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [2, 0])).toBe(0);
    expect(angleThroughPoints([0, 1], [0, 0], [0, 3])).toBe(0);
  });
  
  test('45° (π/4)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [1, 1])).toBeCloseTo(Math.PI / 4);
    expect(angleThroughPoints([1, 0], [0, 0], [4, 4])).toBeCloseTo(Math.PI / 4);
  });
  
  test('90° (π/2)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [0, 1])).toBeCloseTo(Math.PI / 2);
    expect(angleThroughPoints([1, 1], [0, 0], [-1, 1])).toBeCloseTo(Math.PI / 2);
  });
  
  test('135° (3π/4)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [-1, 1])).toBeCloseTo(3 * Math.PI / 4);
    expect(angleThroughPoints([1, 0], [0, 0], [-2, 2])).toBeCloseTo(3 * Math.PI / 4);
  });
  
  test('180° (π)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [-2, 0])).toBeCloseTo(Math.PI);
    expect(angleThroughPoints([1, 1], [0, 0], [-2, -2])).toBeCloseTo(Math.PI);
  });
  
  test('225° (5π/4)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [-1, -1])).toBeCloseTo(5 * Math.PI / 4);
    expect(angleThroughPoints([1, 1], [0, 0], [0, -1])).toBeCloseTo(5 * Math.PI / 4);
  });
  
  test('270° (3π/2)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [0, -1])).toBeCloseTo(3 * Math.PI / 2);
  });
  
  test('315° (7π/4)', () => {
    expect(angleThroughPoints([1, 0], [0, 0], [1, -1])).toBeCloseTo(7 * Math.PI / 4);
    expect(angleThroughPoints([1, 1], [0, 0], [2, 0])).toBeCloseTo(7 * Math.PI / 4);
  });
});