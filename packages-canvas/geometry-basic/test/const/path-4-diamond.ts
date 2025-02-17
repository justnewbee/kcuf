import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 菱形
 *
 *   0  1  2  3  4  5
 * 0 +━━+━━⦿━━+━━+━━+
 * 1 ┃  ↗     ↘
 * 2 ◉           ◉
 * 3 ┃  ↖      ↙
 * 4 ┃     ◉ (2, 4)
 */
export default {
  title: 'Path of points 4 diamond ⬥',
  path: [[2, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 * SQRT2,
  area: 8,
  midpoints: [[3, 1], [3, 3], [1, 3], [1, 1]],
  segments: [[[2, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [2, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [2, 0],
    r: [4, 2],
    b: [2, 4],
    l: [0, 2],
    c: [2, 2]
  }
} satisfies ITestPath;
