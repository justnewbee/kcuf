import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Point,
  rotatePoint
} from '../src';

describe('rotatePoint(point: Point, path: Path): boolean', () => {
  const P: Point = [1, 0];
  const PIVOT: Point = [0, 0];
  
  test('±0', () => {
    expect(rotatePoint(P, PIVOT, 0) === P).toBe(false);
    
    expect(rotatePoint(P, PIVOT, 0)).toEqual(P);
    expect(rotatePoint(P, PIVOT, -0)).toEqual(P);
    
    expect(rotatePoint(P, P, 0)).toEqual(P);
    expect(rotatePoint(P, P, -0)).toEqual(P);
  });
  
  test('±π/2', () => {
    expect(rotatePoint(P, PIVOT, Math.PI / 2)).toEqual([0, 1]);
    expect(rotatePoint(P, PIVOT, -Math.PI / 2)).toEqual([0, -1]);
    
    expect(rotatePoint(P, P, Math.PI / 2)).toEqual(P);
    expect(rotatePoint(P, P, -Math.PI / 2)).toEqual(P);
    
    expect(rotatePoint([2, 0], [1, 0], Math.PI / 2)).toEqual([1, 1]);
    expect(rotatePoint([2, 0], [1, 0], -Math.PI / 2)).toEqual([1, -1]);
  });
  
  test('±π', () => {
    expect(rotatePoint(P, PIVOT, Math.PI)).toEqual([-1, 0]);
    expect(rotatePoint(P, PIVOT, -Math.PI)).toEqual([-1, -0]);
    
    expect(rotatePoint(P, P, Math.PI)).toEqual(P);
    expect(rotatePoint(P, P, -Math.PI)).toEqual(P);
    
    expect(rotatePoint([2, 0], [1, 0], Math.PI)).toEqual([0, 0]);
    expect(rotatePoint([2, 0], [1, 0], -Math.PI)).toEqual([0, -0]);
  });
  
  test('±π3π/2', () => {
    expect(rotatePoint(P, PIVOT, 3 * Math.PI / 2)).toEqual([-0, -1]);
    expect(rotatePoint(P, PIVOT, -3 * Math.PI / 2)).toEqual([-0, 1]);
    
    expect(rotatePoint(P, P, 3 * Math.PI / 2)).toEqual(P);
    expect(rotatePoint(P, P, -3 * Math.PI / 2)).toEqual(P);
  });
  
  test('±2π', () => {
    expect(rotatePoint(P, PIVOT, 2 * Math.PI)).toEqual([1, -0]);
    expect(rotatePoint(P, PIVOT, -2 * Math.PI)).toEqual(P);
    
    expect(rotatePoint(P, P, 2 * Math.PI)).toEqual(P);
    expect(rotatePoint(P, P, -2 * Math.PI)).toEqual(P);
  });
});
