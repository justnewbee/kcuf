import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pointRotateAroundPoint
} from '../src';

describe('pointRotateAroundPoint(point: Point, path: Path): boolean', () => {
  test('±π/2', () => {
    expect(pointRotateAroundPoint([1, 0], [0, 0], Math.PI / 2)).toEqual([0, 1]);
    expect(pointRotateAroundPoint([1, 0], [0, 0], -Math.PI / 2)).toEqual([0, -1]);
    
    expect(pointRotateAroundPoint([2, 0], [1, 0], Math.PI / 2)).toEqual([1, 1]);
    expect(pointRotateAroundPoint([2, 0], [1, 0], -Math.PI / 2)).toEqual([1, -1]);
  });
  
  test('±π', () => {
    expect(pointRotateAroundPoint([1, 0], [0, 0], Math.PI)).toEqual([-1, 0]);
    expect(pointRotateAroundPoint([1, 0], [0, 0], -Math.PI)).toEqual([-1, -0]);
    
    expect(pointRotateAroundPoint([2, 0], [1, 0], Math.PI)).toEqual([0, 0]);
    expect(pointRotateAroundPoint([2, 0], [1, 0], -Math.PI)).toEqual([0, -0]);
  });
  
  test('±π3π/2', () => {
    expect(pointRotateAroundPoint([1, 0], [0, 0], 3 * Math.PI / 2)).toStrictEqual([-0, -1]);
    expect(pointRotateAroundPoint([1, 0], [0, 0], -3 * Math.PI / 2)).toStrictEqual([-0, 1]);
  });
});