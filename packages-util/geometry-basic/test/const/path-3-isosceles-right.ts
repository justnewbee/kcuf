import {
  roundCoords
} from '../../src';
import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 等腰直角三角形
 *
 *   0  1  2  3  4
 * 0 ⦿→ +━━+━━+━━◉
 * 1 ┃          ↙
 * 2 ┃      /
 * 3 ↑   /
 * 4 ◉ (0, 4)
 */
export default {
  title: 'Path of points 3 ◣',
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
  }
} satisfies ITestPath;