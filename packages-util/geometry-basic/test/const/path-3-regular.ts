import {
  roundCoords
} from '../../src';
import {
  ITestPath
} from '../types';

import {
  SQRT3
} from './common';

/**
 * 正三角形
 *
 *   0  1  2  3  4
 * 0 ⦿→ +━━+━━+━━◉
 * 1 ┃ ╲        ↙
 * 2 ┃   ↖   ╱
 * 3 ┃     ◉ (2, 2√3)
 */
export default {
  title: 'Path of points 3 ▲',
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
  }
} satisfies ITestPath;
