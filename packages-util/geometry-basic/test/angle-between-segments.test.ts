import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isNearlyEqual,
  angleBetweenSegments
} from '../src';

describe('angleBetweenSegments(segment1: Segment, segment2: Segment): number', () => {
  test('水平平行同向 0', () => {
    expect(angleBetweenSegments([[0, 0], [1, 0]], [[1, 1], [2, 1]])).toEqual(0);
    expect(angleBetweenSegments([[1, 1], [1, 2]], [[2, 1], [2, 2]])).toEqual(0);
  });

  test('竖直平行同向 0', () => {
    expect(angleBetweenSegments([[3, 1], [3, -1]], [[5, 4], [5, 2]])).toEqual(0);
    expect(angleBetweenSegments([[1, 1], [1, 2]], [[2, 1], [2, 2]])).toEqual(0);
  });

  test('水平平行背向 π→0', () => {
    expect(angleBetweenSegments([[0, 0], [1, 0]], [[2, 1], [1, 1]])).toEqual(0);
    expect(angleBetweenSegments([[1, 1], [1, 2]], [[2, 2], [2, 1]])).toEqual(0);
  });

  test('竖直平行背向 π→0', () => {
    expect(angleBetweenSegments([[3, 1], [3, -1]], [[5, 2], [5, 4]])).toEqual(0);
    expect(angleBetweenSegments([[1, 1], [1, 2]], [[2, 2], [2, 1]])).toEqual(0);
  });

  test('45°', () => {
    expect(isNearlyEqual(angleBetweenSegments([[5, 0], [15, 0]], [[1, 1], [7, 7]]), Math.PI / 4)).toBeTruthy();
  });

  test('90°', () => {
    expect(isNearlyEqual(angleBetweenSegments([[1, 1], [15, 15]], [[0, 100], [100, 0]]), Math.PI / 2)).toBeTruthy();
  });

  test('135°→45°', () => {
    expect(isNearlyEqual(angleBetweenSegments([[5, 0], [15, 0]], [[10, 10], [7, 7]]), Math.PI / 4)).toBeTruthy();
  });
});