import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleBisector
} from '../src';

import {
  SQRT2
} from './const';

describe('angleBisector(angle: Angle): number', () => {
  test('0°', () => {
    expect(angleBisector([[1, 0], [0, 0], [2, 0]])).toEqual([1, 0]);
    expect(angleBisector([[0, 1], [0, 0], [0, 3]])).toEqual([0, 1]);
  });
  
  test('90° (π/2)', () => {
    expect(angleBisector([[1, 0], [0, 0], [0, 1]])[0]).toBeCloseTo(SQRT2 / 2);
    expect(angleBisector([[1, 0], [0, 0], [0, 1]])[1]).toBeCloseTo(SQRT2 / 2);
    
    expect(angleBisector([[1, 1], [0, 0], [-1, 1]])).toEqual([0, 1]);
    expect(angleBisector([[1, 1], [0, 0], [-1, 1]])).toEqual([0, 1]);
  });
  
  test('180° (π)', () => {
    expect(angleBisector([[1, 0], [0, 0], [-2, 0]])[0]).toBeCloseTo(0);
    expect(angleBisector([[1, 0], [0, 0], [-2, 0]])[1]).toBe(1);
  });
  
  test('270° (3π/2)', () => {
    expect(angleBisector([[1, 0], [0, 0], [0, -1]])[0]).toBeCloseTo(SQRT2 / 2);
    expect(angleBisector([[1, 0], [0, 0], [0, -1]])[1]).toBeCloseTo(-SQRT2 / 2);
  });
});