import {
  roundCoords
} from '../../src';
import {
  ITestPath
} from '../types';

import {
  SQRT2,
  SQRT3
} from './common';

/**
 * 正三角形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+
 * 1 | \        ↙
 * 2 |   ↖   /
 * 3 |     ◉ (2, 2√3)
 * 4 |
 */
export const TEST_PATH_3_REGULAR: ITestPath = {
  path: [[0, 0], [4, 0], [2, 2 * SQRT3]],
  perimeter: 12,
  area: 4 * SQRT3,
  midpoints: [[2, 0], [3, SQRT3], [1, SQRT3]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [2, 2 * SQRT3]], [[2, 2 * SQRT3], [0, 0]]],
  centroid: roundCoords([2, 2 * SQRT3 / 3]),
  bbox: [[0, 0], [4, 2 * SQRT3]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [2, 2 * SQRT3],
    l: [0, 0],
    c: roundCoords([2, SQRT3])
  },
  intersection: [],
  slice: []
};

/**
 * 等腰直角三角形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+
 * 1 |          ↙
 * 2 |      /
 * 3 ↑   /
 * 4 ◉ (0, 4)
 * 5 |
 */
export const TEST_PATH_3_ISOSCELES_RIGHT: ITestPath = {
  path: [[0, 0], [4, 0], [0, 4]],
  perimeter: 8 + 4 * SQRT2,
  area: 8,
  midpoints: [[2, 0], [2, 2], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [0, 0]]],
  centroid: roundCoords([4 / 3, 4 / 3]),
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