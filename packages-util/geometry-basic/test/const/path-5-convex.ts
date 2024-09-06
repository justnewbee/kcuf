import {
  ITestPath
} from '../types';

import {
  SQRT2
} from './common';

/**
 * 凸多边形（形如房子）
 *
 *   0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉           ◉
 * 3 | ↖       ↙
 * 4 |     ◉ (2, 4)
 * 5 |
 */
export default {
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
  },
  intersectionWithSegment: [{
    input: [[2, 2], [3, 1]], // both points inside
    output: [],
    outputExtended: [[1, 3], [4, 0]]
  }, {
    input: [[1, 1], [2, 2]], // both points inside
    output: [],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    input: [[5, 0], [6, 1]], // both points outside no crossing
    output: [],
    outputExtended: []
  }, {
    input: [[5, 3], [6, 4]],
    output: [],
    outputExtended: [[2, 0], [4, 2]]
  }, {
    input: [[6, 4], [5, 3]],
    output: [],
    outputExtended: [[4, 2], [2, 0]]
  }, {
    input: [[-1, -1], [4, 4]], // both points outside crossing through
    output: [[0, 0], [3, 3]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    input: [[0, 0], [4, 2]], // both points are path points
    output: [[0, 0], [4, 2]],
    outputExtended: [[0, 0], [4, 2]]
  }, {
    input: [[0, 1], [3, 3]], // both points are along edge
    output: [[0, 1], [3, 3]],
    outputExtended: [[0, 1], [3, 3]]
  }, {
    input: [[0, 0], [2, 2]], // one path point, one inside
    output: [[0, 0]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    input: [[4, 2], [3, 1]], // one path point, one inside
    output: [[4, 2]],
    outputExtended: [[4, 2], [2, 0]]
  }, {
    input: [[4, 2], [5, 3]], // one path point, one outward
    output: [[4, 2]],
    outputExtended: [[2, 0], [4, 2]]
  }, {
    input: [[0, 0], [4, 4]], // one path point, one through
    output: [[0, 0], [3, 3]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    input: [[0, 1], [2, 3]], // one along border, one inside
    output: [[0, 1]],
    outputExtended: [[0, 1], [2.5, 3.5]]
  }, {
    input: [[4, 1], [5, 2]], // one along border, one outward
    output: [[4, 1]],
    outputExtended: [[3, 0], [4, 1]]
  }, {
    input: [[2, 0], [5, 3]], // one along border, one through
    output: [[2, 0], [4, 2]],
    outputExtended: [[2, 0], [4, 2]]
  }]
} satisfies ITestPath;