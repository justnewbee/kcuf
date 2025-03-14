import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 交叉图形
 *
 * 4 ◉→ ---------◉
 * 3 |  ↖     ↙
 * 2 |     +
 * 1 |  ↙     ↖
 * 0 ⦿→ +--+--+--◉--
 *   0  1  2  3  4
 */
export default {
  title: 'Path of points 4 crossing X',
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
  }
} satisfies ITestPath;
