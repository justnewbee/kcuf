import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  pointDistanceToLine
} from '../src';

import {
  LINE_1X_0Y_N5,
  LINE_1X_0Y_N4,
  LINE_1X_0Y_N3,
  LINE_1X_0Y_N2,
  LINE_1X_0Y_N1,
  LINE_1X_0Y_0,
  LINE_1X_0Y_1,
  LINE_0X_N1Y_N1,
  LINE_0X_N1Y_0,
  LINE_0X_N1Y_1,
  LINE_0X_N1Y_2,
  LINE_0X_N1Y_3,
  LINE_0X_N1Y_4,
  LINE_0X_N1Y_5,
  LINE_1X_N1Y_N1,
  LINE_1X_N1Y_0,
  LINE_1X_N1Y_1,
  LINE_1X_N1Y_2,
  LINE_1X_N1Y_3,
  LINE_1X_N1Y_4,
  LINE_1X_N1Y_5,
  LINE_N1X_N1Y_N1,
  LINE_N1X_N1Y_0,
  LINE_N1X_N1Y_1,
  LINE_N1X_N1Y_2,
  LINE_N1X_N1Y_3,
  LINE_N1X_N1Y_4,
  LINE_N1X_N1Y_5
} from './const';

describe('pointDistanceToLine(point: Point, line: Line): number', () => {
  const P: Point = [0, 0];
  
  test('x = n', () => {
    expect(pointDistanceToLine(P, LINE_1X_0Y_N5)).toEqual(5);
    expect(pointDistanceToLine(P, LINE_1X_0Y_N4)).toEqual(4);
    expect(pointDistanceToLine(P, LINE_1X_0Y_N3)).toEqual(3);
    expect(pointDistanceToLine(P, LINE_1X_0Y_N2)).toEqual(2);
    expect(pointDistanceToLine(P, LINE_1X_0Y_N1)).toEqual(1);
    expect(pointDistanceToLine(P, LINE_1X_0Y_0)).toEqual(0);
    expect(pointDistanceToLine(P, LINE_1X_0Y_1)).toEqual(1);
  });
  
  test('y = n', () => {
    expect(pointDistanceToLine(P, LINE_0X_N1Y_N1)).toEqual(1);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_0)).toEqual(0);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_1)).toEqual(1);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_2)).toEqual(2);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_3)).toEqual(3);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_4)).toEqual(4);
    expect(pointDistanceToLine(P, LINE_0X_N1Y_5)).toEqual(5);
  });
  
  test('y = x + n', () => {
    expect(pointDistanceToLine(P, LINE_1X_N1Y_N1)).toBeCloseTo(Math.hypot(1, 1) / 2);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_0)).toEqual(0);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_1)).toBeCloseTo(Math.hypot(1, 1) / 2);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_2)).toBeCloseTo(Math.hypot(2, 2) / 2);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_3)).toBeCloseTo(Math.hypot(3, 3) / 2);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_4)).toBeCloseTo(Math.hypot(4, 4) / 2);
    expect(pointDistanceToLine(P, LINE_1X_N1Y_5)).toBeCloseTo(Math.hypot(5, 5) / 2);
  });
  
  test('y = -x + n', () => {
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_N1)).toBeCloseTo(Math.hypot(1, 1) / 2);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_0)).toEqual(0);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_1)).toBeCloseTo(Math.hypot(1, 1) / 2);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_2)).toBeCloseTo(Math.hypot(2, 2) / 2);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_3)).toBeCloseTo(Math.hypot(3, 3) / 2);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_4)).toBeCloseTo(Math.hypot(4, 4) / 2);
    expect(pointDistanceToLine(P, LINE_N1X_N1Y_5)).toBeCloseTo(Math.hypot(5, 5) / 2);
  });
});
