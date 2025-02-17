import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleRadians,
  angleDegrees
} from '../src';

describe('angleRadians(angle: Angle): number / angleDegrees(angle: Angle): number', () => {
  test('0°', () => {
    expect(angleRadians([[1, 0], [0, 0], [2, 0]])).toBe(0);
    expect(angleRadians([[0, 1], [0, 0], [0, 3]])).toBe(0);
    
    expect(angleDegrees([[1, 0], [0, 0], [2, 0]])).toBe(0);
    expect(angleDegrees([[0, 1], [0, 0], [0, 3]])).toBe(0);
  });
  
  test('45° (π/4)', () => {
    expect(angleRadians([[1, 0], [0, 0], [1, 1]])).toBeCloseTo(Math.PI / 4);
    expect(angleRadians([[1, 0], [0, 0], [4, 4]])).toBeCloseTo(Math.PI / 4);
    
    expect(angleDegrees([[1, 0], [0, 0], [1, 1]])).toBe(45);
    expect(angleDegrees([[1, 0], [0, 0], [4, 4]])).toBe(45);
  });
  
  test('90° (π/2)', () => {
    expect(angleRadians([[1, 0], [0, 0], [0, 1]])).toBeCloseTo(Math.PI / 2);
    expect(angleRadians([[1, 1], [0, 0], [-1, 1]])).toBeCloseTo(Math.PI / 2);
    
    expect(angleDegrees([[1, 0], [0, 0], [0, 1]])).toBe(90);
    expect(angleDegrees([[1, 1], [0, 0], [-1, 1]])).toBe(90);
  });
  
  test('135° (3π/4)', () => {
    expect(angleRadians([[1, 0], [0, 0], [-1, 1]])).toBeCloseTo(3 * Math.PI / 4);
    expect(angleRadians([[1, 0], [0, 0], [-2, 2]])).toBeCloseTo(3 * Math.PI / 4);
    
    expect(angleDegrees([[1, 0], [0, 0], [-1, 1]])).toBeCloseTo(135);
    expect(angleDegrees([[1, 0], [0, 0], [-2, 2]])).toBeCloseTo(135);
  });
  
  test('180° (π)', () => {
    expect(angleRadians([[1, 0], [0, 0], [-2, 0]])).toBeCloseTo(Math.PI);
    expect(angleRadians([[1, 1], [0, 0], [-2, -2]])).toBeCloseTo(Math.PI);
    
    expect(angleDegrees([[1, 0], [0, 0], [-2, 0]])).toBeCloseTo(180);
    expect(angleDegrees([[1, 1], [0, 0], [-2, -2]])).toBeCloseTo(180);
  });
  
  test('225° (5π/4)', () => {
    expect(angleRadians([[1, 0], [0, 0], [-1, -1]])).toBeCloseTo(5 * Math.PI / 4);
    expect(angleRadians([[1, 1], [0, 0], [0, -1]])).toBeCloseTo(5 * Math.PI / 4);
    
    expect(angleDegrees([[1, 0], [0, 0], [-1, -1]])).toBe(225);
    expect(angleDegrees([[1, 1], [0, 0], [0, -1]])).toBe(225);
  });
  
  test('270° (3π/2)', () => {
    expect(angleRadians([[1, 0], [0, 0], [0, -1]])).toBeCloseTo(3 * Math.PI / 2);
    
    expect(angleDegrees([[1, 0], [0, 0], [0, -1]])).toBe(270);
  });
  
  test('315° (7π/4)', () => {
    expect(angleRadians([[1, 0], [0, 0], [1, -1]])).toBeCloseTo(7 * Math.PI / 4);
    expect(angleRadians([[1, 1], [0, 0], [2, 0]])).toBeCloseTo(7 * Math.PI / 4);
    
    expect(angleDegrees([[1, 0], [0, 0], [1, -1]])).toBeCloseTo(315);
    expect(angleDegrees([[1, 1], [0, 0], [2, 0]])).toBeCloseTo(315);
  });
});
