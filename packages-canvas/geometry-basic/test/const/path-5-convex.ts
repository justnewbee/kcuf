import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 凸多边形（形如房子）
 *
 * 4 |     ◉ (2, 4)
 * 3 | ↙       ↖
 * 2 ◉           ◉
 * 1 ↓           ↑
 * 0 ⦿→ +--+--+--◉--
 *   0  1  2  3  4
 */
export default {
  title: 'Path of points 5 ⌂',
  path: [[0, 0], [4, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 + 4 * SQRT2,
  area: 12,
  midpoints: [[2, 0], [4, 1], [3, 3], [1, 3], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [2, 4],
    l: [0, 0],
    c: [2, 2]
  }
} satisfies ITestPath;
