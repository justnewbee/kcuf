import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 矩形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉--------- ←◉ (4, 2)
 * 3 |
 */
export const TEST_PATH_4_RECTANGLE: ITestPath = {
  path: [[0, 0], [4, 0], [4, 2], [0, 2]],
  perimeter: 12,
  area: 8,
  midpoints: [[2, 0], [4, 1], [2, 2], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [0, 2]], [[0, 2], [0, 0]]],
  centroid: [2, 1],
  bbox: [[0, 0], [4, 2]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [4, 2],
    l: [0, 0],
    c: [2, 1]
  },
  intersection: [],
  slice: []
};

/**
 * 正方形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 |           ↓
 * 2 |           |
 * 3 ↑           |
 * 4 ◉--------- ←◉ (4, 4)
 * 5 |
 */
export const TEST_PATH_4_SQUARE: ITestPath = {
  path: [[0, 0], [4, 0], [4, 4], [0, 4]],
  perimeter: 16,
  area: 16,
  midpoints: [[2, 0], [4, 2], [2, 4], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [0, 4]], [[0, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [4, 4],
    l: [0, 0],
    c: [2, 2]
  },
  intersection: [],
  slice: [{
    input: [
      [1, -1, 0] // y = x
    ],
    output: [
      [[0, 0], [4, 0], [4, 4]],
      [[4, 4], [0, 4], [0, 0]]
    ]
  }]
};

/**
 * 菱形
 *
 *  0  1  2  3  4  5
 * 0 +--+--⦿--+--+--+-
 * 1 |  ↗     ↘
 * 2 ◉           ◉
 * 3 |  ↖      ↙
 * 4 |     ◉ (2, 4)
 * 5 |
 */
export const TEST_PATH_4_DIAMOND: ITestPath = {
  path: [[2, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 * SQRT2,
  area: 8,
  midpoints: [[3, SQRT2], [3, 3 * SQRT2], [2, 3 * SQRT2], [1, SQRT2]],
  segments: [[[2, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [2, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [2, 0],
    r: [4, 2],
    b: [2, 4],
    l: [0, 2],
    c: [2, 2]
  },
  intersection: [],
  slice: []
};

/**
 * 交叉图形
 *
 *   0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 |  ↖      ↙
 * 2 |     +
 * 3 |  ↙     ↖
 * 4 ◉→ ---------◉
 * 5 |
 */
export const TEST_PATH_4_CROSSING: ITestPath = {
  path: [[0, 0], [4, 0], [0, 4], [4, 4]],
  perimeter: 8 + 8 * SQRT2,
  area: 8,
  midpoints: [[2, 0], [2, 2], [2, 4], [2, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [4, 4]], [[4, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [0, 4],
    l: [0, 0],
    c: [2, 2]
  },
  intersection: [],
  slice: []
};