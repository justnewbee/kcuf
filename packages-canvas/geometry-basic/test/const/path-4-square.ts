import {
  ITestPath
} from '../types';

/**
 * 正方形
 *
 * 4 ◉---------- ←◉ (4, 4)
 * 3 ↓            |
 * 2 |            |
 * 1 |            ↑
 * 0 ⦿→ +--+--+--◉--
 *   0  1  2  3  4
 */
export default {
  title: 'Path of points 4 square ◼',
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
  }
} satisfies ITestPath;
