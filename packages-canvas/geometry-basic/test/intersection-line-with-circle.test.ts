import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Circle,
  intersectionLineWithCircle
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

describe('intersectionLineWithCircle(line: Line, circle: Circle): Point[]', () => {
  const circle: Circle = [[0, 0], 2];
  
  test('平行于 x 轴的直线', () => {
    expect(intersectionLineWithCircle(LINE_0X_N1Y_N1, circle)).toEqual([[-Math.sqrt(3), -1], [Math.sqrt(3), -1]]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_0, circle)).toEqual([[-2, 0], [2, 0]]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_1, circle)).toEqual([[-Math.sqrt(3), 1], [Math.sqrt(3), 1]]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_2, circle)).toEqual([[0, 2]]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_3, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_4, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_0X_N1Y_5, circle)).toEqual([]);
  });
  
  test('平行于 y 轴的直线', () => {
    expect(intersectionLineWithCircle(LINE_1X_0Y_N5, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_N4, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_N3, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_N2, circle)).toEqual([[2, 0]]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_N1, circle)).toEqual([[1, -Math.sqrt(3)], [1, Math.sqrt(3)]]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_0, circle)).toEqual([[-0, -2], [-0, 2]]);
    expect(intersectionLineWithCircle(LINE_1X_0Y_1, circle)).toEqual([[-1, -Math.sqrt(3)], [-1, Math.sqrt(3)]]);
  });
  
  test('正斜率', () => {
    expect(intersectionLineWithCircle(LINE_1X_N1Y_N1, circle)).toEqual([[-0.8228756555322954, -1.8228756555322954], [1.8228756555322954, 0.8228756555322954]]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_0, circle)).toEqual([[-Math.sqrt(2), -Math.sqrt(2)], [Math.sqrt(2), Math.sqrt(2)]]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_1, circle)).toEqual([[-1.8228756555322954, -0.8228756555322954], [0.8228756555322954, 1.8228756555322954]]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_2, circle)).toEqual([[-2, 0], [0, 2]]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_3, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_4, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_1X_N1Y_5, circle)).toEqual([]);
  });
  
  test('负斜率', () => {
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_N1, circle)).toEqual([[-1.8228756555322954, 0.8228756555322954], [0.8228756555322954, -1.8228756555322954]]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_0, circle)).toEqual([[-Math.sqrt(2), Math.sqrt(2)], [Math.sqrt(2), -Math.sqrt(2)]]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_1, circle)).toEqual([[-0.8228756555322954, 1.8228756555322954], [1.8228756555322954, -0.8228756555322954]]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_2, circle)).toEqual([[0, 2], [2, 0]]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_3, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_4, circle)).toEqual([]);
    expect(intersectionLineWithCircle(LINE_N1X_N1Y_5, circle)).toEqual([]);
  });
});
