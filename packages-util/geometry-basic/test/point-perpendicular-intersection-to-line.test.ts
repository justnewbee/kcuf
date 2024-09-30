import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  pointPerpendicularIntersectionToLine
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

describe('pointDistance(point1: Point, point2: Point): number', () => {
  const P: Point = [0, 0];
  
  test('x = n', () => {
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_N5)).toEqual([5, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_N4)).toEqual([4, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_N3)).toEqual([3, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_N2)).toEqual([2, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_N1)).toEqual([1, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_0)).toEqual([0, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_0Y_1)).toEqual([-1, 0]);
  });
  
  test('y = n', () => {
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_N1)).toEqual([0, -1]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_0)).toEqual([0, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_1)).toEqual([0, 1]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_2)).toEqual([0, 2]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_3)).toEqual([0, 3]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_4)).toEqual([0, 4]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_0X_N1Y_5)).toEqual([0, 5]);
  });
  
  test('y = x + n', () => {
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_N1)).toEqual([0.5, -0.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_0)).toEqual([0, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_1)).toEqual([-0.5, 0.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_2)).toEqual([-1, 1]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_3)).toEqual([-1.5, 1.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_4)).toEqual([-2, 2]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_1X_N1Y_5)).toEqual([-2.5, 2.5]);
  });
  
  test('y = -x + n', () => {
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_N1)).toEqual([-0.5, -0.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_0)).toEqual([0, 0]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_1)).toEqual([0.5, 0.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_2)).toEqual([1, 1]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_3)).toEqual([1.5, 1.5]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_4)).toEqual([2, 2]);
    expect(pointPerpendicularIntersectionToLine(P, LINE_N1X_N1Y_5)).toEqual([2.5, 2.5]);
  });
});