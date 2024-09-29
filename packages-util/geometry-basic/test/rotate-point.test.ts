import {
  describe,
  expect,
  test
} from 'vitest';

import {
  rotatePoint
} from '../src';

describe('rotatePoint(point: Point, path: Path): boolean', () => {
  test('±π/2', () => {
    expect(rotatePoint([1, 0], [0, 0], Math.PI / 2)).toEqual([0, 1]);
    expect(rotatePoint([1, 0], [0, 0], -Math.PI / 2)).toEqual([0, -1]);
    
    expect(rotatePoint([2, 0], [1, 0], Math.PI / 2)).toEqual([1, 1]);
    expect(rotatePoint([2, 0], [1, 0], -Math.PI / 2)).toEqual([1, -1]);
  });
  
  test('±π', () => {
    expect(rotatePoint([1, 0], [0, 0], Math.PI)).toEqual([-1, 0]);
    expect(rotatePoint([1, 0], [0, 0], -Math.PI)).toEqual([-1, -0]);
    
    expect(rotatePoint([2, 0], [1, 0], Math.PI)).toEqual([0, 0]);
    expect(rotatePoint([2, 0], [1, 0], -Math.PI)).toEqual([0, -0]);
  });
  
  test('±π3π/2', () => {
    expect(rotatePoint([1, 0], [0, 0], 3 * Math.PI / 2)).toStrictEqual([-0, -1]);
    expect(rotatePoint([1, 0], [0, 0], -3 * Math.PI / 2)).toStrictEqual([-0, 1]);
  });
});