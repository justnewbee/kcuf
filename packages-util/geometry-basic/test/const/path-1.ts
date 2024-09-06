import {
  ITestPath
} from '../types';

/**
 * 一个点
 *
 *   0  1  2  3  4  5
 * 0 +--+--+--+--+--+
 * 1 |
 * 2 |  ⦿ (1, 2)
 * 3 |
 */
export default {
  path: [[1, 2]],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: [1, 2],
  bbox: [[1, 2], [1, 2]],
  ecp: {
    t: [1, 2],
    r: [1, 2],
    b: [1, 2],
    l: [1, 2],
    c: [1, 2]
  }
} satisfies ITestPath;