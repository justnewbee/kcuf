import {
  describe,
  expect,
  test
} from 'vitest';

import {
  checkCollinear
} from '../src';

describe('checkCollinear(point1: Point, point2: Point, point3: Point): boolean', () => {
  test('order does not matter', () => {
    expect(checkCollinear([0, 0], [0, 1], [0, 2])).toBe(true);
    expect(checkCollinear([0, 0], [0, 2], [0, 1])).toBe(true);
    expect(checkCollinear([0, 1], [0, 2], [0, 0])).toBe(true);
    expect(checkCollinear([0, 2], [0, 0], [0, 1])).toBe(true);
    
    expect(checkCollinear([1, 1], [2, 2], [3, 3])).toBe(true);
    expect(checkCollinear([1, 1], [3, 3], [2, 2])).toBe(true);
    expect(checkCollinear([3, 3], [1, 1], [2, 2])).toBe(true);
    expect(checkCollinear([3, 3], [2, 2], [1, 1])).toBe(true);
  });
  
  test('with dup', () => {
    const sqrt7 = Math.sqrt(7);
    
    expect(checkCollinear([0, 0], [0, 0], [0, 2])).toBe(true);
    expect(checkCollinear([0, 0], [0, 3], [0, 0])).toBe(true);
    expect(checkCollinear([sqrt7, sqrt7], [sqrt7, sqrt7], [sqrt7, sqrt7])).toBe(true);
  });
  
  test('with fractional', () => {
    expect(checkCollinear([1 / 3, 1 / 3], [2 / 3, 2 / 3], [3 / 3, 3 / 3])).toBe(true);
    expect(checkCollinear([Math.sqrt(5), -Math.sqrt(5)], [Math.sqrt(11), -Math.sqrt(11)], [Math.sqrt(13), -Math.sqrt(13)])).toBe(true);
  });
});