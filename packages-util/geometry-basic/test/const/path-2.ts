import {
  ITestPath
} from '../types';

/**
 * 线段
 *
 *  0  1  2  3  4  5
 * 0 +--+--+--+--+--+
 * 1 |
 * 2 |
 * 3 |     ◉ (2, 3)
 * 4 |   ↗
 * 5 |  ⦿ (1, 5)
 */
export const TEST_PATH_2: ITestPath = {
  path: [[1, 5], [2, 3]],
  perimeter: Math.hypot(1, 2),
  area: 0,
  midpoints: [[1.5, 4]],
  segments: [[[1, 5], [2, 3]]],
  centroid: [1.5, 4],
  bbox: [[1, 3], [2, 5]],
  ecp: {
    t: [2, 3],
    r: [2, 3],
    b: [1, 5],
    l: [1, 5],
    c: [1.5, 4]
  },
  intersection: [],
  slice: []
};
