import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleOfLineWithRespectToAxisX,
  angleOfLineWithRespectToAxisY
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

describe('angle of line with respect to axis x & y', () => {
  describe('angleOfLineWithRespectToAxisX(line: Line): number', () => {
    test('0°', () => {
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_N1)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_0)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_1)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_2)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_3)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_4)).toBe(0);
      expect(angleOfLineWithRespectToAxisX(LINE_0X_N1Y_5)).toBe(0);
    });
    
    test('45° (π/4)', () => {
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_N1)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_0)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_1)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_2)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_3)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_4)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_N1Y_5)).toBe(Math.PI / 4);
    });
    
    test('90° (π/2)', () => {
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_N5)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_N4)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_N3)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_N2)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_N1)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_0)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_1)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_1)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisX(LINE_1X_0Y_1)).toBe(Math.PI / 2);
    });
    
    test('135° (3π/4)', () => {
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_N1)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_0)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_1)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_2)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_3)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_4)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisX(LINE_N1X_N1Y_5)).toBe(3 * Math.PI / 4);
    });
  });
  
  describe('angleOfLineWithRespectToAxisY(line: Line): number', () => {
    test('0°', () => {
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_N5)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_N4)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_N3)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_N2)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_N1)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_0)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_1)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_1)).toBe(0);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_0Y_1)).toBe(0);
    });
    
    test('45° (π/4)', () => {
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_N1)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_0)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_1)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_2)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_3)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_4)).toBe(Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_N1X_N1Y_5)).toBe(Math.PI / 4);
    });
    
    test('90° (π/2)', () => {
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_N1)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_0)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_1)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_2)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_3)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_4)).toBe(Math.PI / 2);
      expect(angleOfLineWithRespectToAxisY(LINE_0X_N1Y_5)).toBe(Math.PI / 2);
    });
    
    test('135° (3π/4)', () => {
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_N1)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_0)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_1)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_2)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_3)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_4)).toBe(3 * Math.PI / 4);
      expect(angleOfLineWithRespectToAxisY(LINE_1X_N1Y_5)).toBe(3 * Math.PI / 4);
    });
  });
});