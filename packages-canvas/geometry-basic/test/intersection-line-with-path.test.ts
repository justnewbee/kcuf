import {
  describe,
  expect,
  test
} from 'vitest';

import {
  intersectionLineWithPath
} from '../src';

import {
  LINE_0X_N1Y_0,
  LINE_0X_N1Y_1,
  LINE_0X_N1Y_2,
  LINE_0X_N1Y_3,
  LINE_0X_N1Y_4,
  LINE_0X_N1Y_5,
  LINE_0X_N1Y_N1,
  LINE_1X_0Y_0,
  LINE_1X_0Y_1,
  LINE_1X_0Y_N1,
  LINE_1X_0Y_N2,
  LINE_1X_0Y_N3,
  LINE_1X_0Y_N4,
  LINE_1X_0Y_N5,
  LINE_1X_N1Y_0,
  LINE_1X_N1Y_1,
  LINE_1X_N1Y_2,
  LINE_1X_N1Y_3,
  LINE_1X_N1Y_4,
  LINE_1X_N1Y_5,
  LINE_1X_N1Y_N1,
  LINE_N1X_N1Y_0,
  LINE_N1X_N1Y_1,
  LINE_N1X_N1Y_2,
  LINE_N1X_N1Y_3,
  LINE_N1X_N1Y_4,
  LINE_N1X_N1Y_5,
  LINE_N1X_N1Y_N1,
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  // TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
  // TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX
  // TEST_PATH_6_CONCAVE
} from './const';

describe('intersectionLineWithPath(line: Line, path: Path): Point[]', () => {
  test('x = -1', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_1, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('x = 0', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_0, TEST_PATH_4_SQUARE.path)).toEqual([[-0, 0], [-0, 4]]);
  });

  test('x = 1', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_N1, TEST_PATH_4_SQUARE.path)).toEqual([[1, 0], [1, 4]]);
  });

  test('x = 2', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_N2, TEST_PATH_4_SQUARE.path)).toEqual([[2, 0], [2, 4]]);
  });

  test('x = 3', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_N3, TEST_PATH_4_SQUARE.path)).toEqual([[3, 0], [3, 4]]);
  });

  test('x = 4', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_N4, TEST_PATH_4_SQUARE.path)).toEqual([[4, 0], [4, 4]]);
  });

  test('x = 5', () => {
    expect(intersectionLineWithPath(LINE_1X_0Y_N5, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('y = -1', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_N1, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('y = 0', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_0, TEST_PATH_4_SQUARE.path)).toEqual([[0, 0], [4, 0]]);
  });

  test('y = 1', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_1, TEST_PATH_4_SQUARE.path)).toEqual([[0, 1], [4, 1]]);
  });

  test('y = 2', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_2, TEST_PATH_4_SQUARE.path)).toEqual([[0, 2], [4, 2]]);
  });

  test('y = 3', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_3, TEST_PATH_4_SQUARE.path)).toEqual([[0, 3], [4, 3]]);
  });

  test('y = 4', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_4, TEST_PATH_4_SQUARE.path)).toEqual([[0, 4], [4, 4]]);
  });

  test('y = 5', () => {
    expect(intersectionLineWithPath(LINE_0X_N1Y_5, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('y = x - 1', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_N1, TEST_PATH_4_SQUARE.path)).toEqual([[1, 0], [4, 3]]);
  });

  test('y = x', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_0, TEST_PATH_4_SQUARE.path)).toEqual([[0, 0], [4, 4]]);
  });

  test('y = x + 1', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_1, TEST_PATH_4_SQUARE.path)).toEqual([[0, 1], [3, 4]]);
  });

  test('y = x + 2', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_2, TEST_PATH_4_SQUARE.path)).toEqual([[0, 2], [2, 4]]);
  });

  test('y = x + 3', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_3, TEST_PATH_4_SQUARE.path)).toEqual([[0, 3], [1, 4]]);
  });

  test('y = x + 4', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_4, TEST_PATH_4_SQUARE.path)).toEqual([[-0, 4]]);
  });

  test('y = x + 5', () => {
    expect(intersectionLineWithPath(LINE_1X_N1Y_5, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('y = -x - 1', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_N1, TEST_PATH_4_SQUARE.path)).toEqual([]);
  });

  test('y = -x', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_0, TEST_PATH_4_SQUARE.path)).toEqual([[-0, 0]]);
  });

  test('y = -x + 1', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_1, TEST_PATH_4_SQUARE.path)).toEqual([[0, 1], [1, 0]]);
  });

  test('y = -x + 2', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_2, TEST_PATH_4_SQUARE.path)).toEqual([[0, 2], [2, 0]]);
  });

  test('y = -x + 3', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_3, TEST_PATH_4_SQUARE.path)).toEqual([[0, 3], [3, 0]]);
  });

  test('y = -x + 4', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_4, TEST_PATH_4_SQUARE.path)).toEqual([[0, 4], [4, 0]]);
  });

  test('y = -x + 5', () => {
    expect(intersectionLineWithPath(LINE_N1X_N1Y_5, TEST_PATH_4_SQUARE.path)).toEqual([[1, 4], [4, 1]]);
  });
});
