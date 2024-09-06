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
    title: 'both points inside',
    input: [[2, 2], [3, 1]],
    output: [],
    outputExtended: [[1, 3], [4, 0]]
  }, {
    title: 'both points inside 2',
    input: [[1, 1], [2, 2]],
    output: [],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    title: 'both points outside no crossing',
    input: [[5, 0], [6, 1]],
    output: [],
    outputExtended: []
  }, {
    title: 'both points outside no crossing 2',
    input: [[5, 3], [6, 4]],
    output: [],
    outputExtended: [[2, 0], [4, 2]]
  }, {
    title: 'both points outside no crossing 3',
    input: [[6, 4], [5, 3]],
    output: [],
    outputExtended: [[4, 2], [2, 0]]
  }, {
    title: 'both points outside crossing through',
    input: [[-1, -1], [4, 4]],
    output: [[0, 0], [3, 3]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    title: 'both points are path points',
    input: [[0, 0], [4, 2]],
    output: [[0, 0], [4, 2]],
    outputExtended: [[0, 0], [4, 2]]
  }, {
    title: 'both points are along edge',
    input: [[0, 1], [3, 3]],
    output: [[0, 1], [3, 3]],
    outputExtended: [[0, 1], [3, 3]]
  }, {
    title: 'one path point, one inside',
    input: [[0, 0], [2, 2]],
    output: [[0, 0]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    title: 'one path point, one inside',
    input: [[4, 2], [3, 1]],
    output: [[4, 2]],
    outputExtended: [[4, 2], [2, 0]]
  }, {
    title: 'one path point, one outward',
    input: [[4, 2], [5, 3]],
    output: [[4, 2]],
    outputExtended: [[2, 0], [4, 2]]
  }, {
    title: 'one path point, one through',
    input: [[0, 0], [4, 4]],
    output: [[0, 0], [3, 3]],
    outputExtended: [[0, 0], [3, 3]]
  }, {
    title: 'one along border, one inside',
    input: [[0, 1], [2, 3]],
    output: [[0, 1]],
    outputExtended: [[0, 1], [2.5, 3.5]]
  }, {
    title: 'one along border, one outward',
    input: [[4, 1], [5, 2]],
    output: [[4, 1]],
    outputExtended: [[3, 0], [4, 1]]
  }, {
    title: 'one along border, one through',
    input: [[2, 0], [5, 3]],
    output: [[2, 0], [4, 2]],
    outputExtended: [[2, 0], [4, 2]]
  }]
} satisfies ITestPath;