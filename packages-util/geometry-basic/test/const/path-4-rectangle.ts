import {
  ITestPath
} from '../types';

/**
 * 矩形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉--------- ←◉ (4, 2)
 * 3 |
 */
export default {
  title: 'Path of points 4 rectangle 🀰',
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
  }
} satisfies ITestPath;
