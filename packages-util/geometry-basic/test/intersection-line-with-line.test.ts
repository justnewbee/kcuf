import {
  describe,
  expect,
  test
} from 'vitest';

import {
  intersectionLineWithLine
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

describe('intersectionLineWithLine(line1: LineCoefficients, line2: LineCoefficients): Point', () => {
  test('same line', () => {
    expect(intersectionLineWithLine(LINE_1X_0Y_N5, LINE_1X_0Y_N5)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N4, LINE_1X_0Y_N4)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N3, LINE_1X_0Y_N3)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N2, LINE_1X_0Y_N2)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N1, LINE_1X_0Y_N1)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_0, LINE_1X_0Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_1, LINE_1X_0Y_1)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_N1, LINE_0X_N1Y_N1)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_0, LINE_0X_N1Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_1, LINE_0X_N1Y_1)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_2, LINE_0X_N1Y_2)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_3, LINE_0X_N1Y_3)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_4, LINE_0X_N1Y_4)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_5, LINE_0X_N1Y_5)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_N1, LINE_1X_N1Y_N1)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_0, LINE_1X_N1Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_1, LINE_1X_N1Y_1)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_2, LINE_1X_N1Y_2)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_3, LINE_1X_N1Y_3)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_4, LINE_1X_N1Y_4)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_N1Y_5, LINE_1X_N1Y_5)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_N1, LINE_N1X_N1Y_N1)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_0, LINE_N1X_N1Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_1, LINE_N1X_N1Y_1)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_2, LINE_N1X_N1Y_2)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_3, LINE_N1X_N1Y_3)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_4, LINE_N1X_N1Y_4)).toBeNull();
    expect(intersectionLineWithLine(LINE_N1X_N1Y_5, LINE_N1X_N1Y_5)).toBeNull();
  });
  
  test('parallel lines', () => {
    expect(intersectionLineWithLine(LINE_1X_0Y_N5, LINE_1X_0Y_N4)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N4, LINE_1X_0Y_N3)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N3, LINE_1X_0Y_N2)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N2, LINE_1X_0Y_N1)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_N1, LINE_1X_0Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_1X_0Y_0, LINE_1X_0Y_1)).toBeNull();
    
    expect(intersectionLineWithLine(LINE_0X_N1Y_N1, LINE_0X_N1Y_0)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_0, LINE_0X_N1Y_1)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_1, LINE_0X_N1Y_2)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_2, LINE_0X_N1Y_3)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_3, LINE_0X_N1Y_4)).toBeNull();
    expect(intersectionLineWithLine(LINE_0X_N1Y_4, LINE_0X_N1Y_5)).toBeNull();
  });
  
  test('crossing lines', () => {
    // 垂直相交
    expect(intersectionLineWithLine(LINE_1X_N1Y_0, LINE_N1X_N1Y_2)).toEqual([1, 1]);
    expect(intersectionLineWithLine(LINE_1X_N1Y_0, LINE_N1X_N1Y_4)).toEqual([2, 2]);
    // y = x 与 x = 4
    expect(intersectionLineWithLine(LINE_1X_N1Y_0, LINE_1X_0Y_N4)).toEqual([4, 4]);
    // y = x 与 y = 5
    expect(intersectionLineWithLine(LINE_1X_N1Y_0, LINE_0X_N1Y_5)).toEqual([5, 5]);
    // y = 2x + 3 与 y = x + 4
    expect(intersectionLineWithLine([2, -1, 3], LINE_1X_N1Y_4)).toEqual([1, 5]);
  });
});
