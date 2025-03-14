import {
  ITestPath
} from '../types';

import {
  LINE_1X_0Y_N5,
  LINE_1X_0Y_N4,
  LINE_1X_0Y_N3,
  LINE_1X_0Y_N2,
  LINE_1X_0Y_N1,
  LINE_1X_0Y_0,
  LINE_1X_0Y_1,
  LINE_0X_N1Y_N1,
  LINE_0X_N1Y_0,
  LINE_0X_N1Y_1,
  LINE_0X_N1Y_2,
  LINE_0X_N1Y_3,
  LINE_0X_N1Y_4,
  LINE_0X_N1Y_5,
  LINE_1X_N1Y_N1,
  LINE_1X_N1Y_0,
  LINE_1X_N1Y_1,
  LINE_1X_N1Y_2,
  LINE_1X_N1Y_3,
  LINE_1X_N1Y_4,
  LINE_1X_N1Y_5,
  LINE_N1X_N1Y_N1,
  LINE_N1X_N1Y_0,
  LINE_N1X_N1Y_1,
  LINE_N1X_N1Y_2,
  LINE_N1X_N1Y_3,
  LINE_N1X_N1Y_4,
  LINE_N1X_N1Y_5
} from './lines';

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
  },
  intersectionWithLine: [
    {
      title: 'x = -1',
      input: LINE_1X_0Y_1,
      output: []
    }, {
      title: 'x = 0',
      input: LINE_1X_0Y_0,
      output: [[-0, 0], [-0, 4]]
    }, {
      title: 'x = 1',
      input: LINE_1X_0Y_N1,
      output: [[1, 0], [1, 4]]
    }, {
      title: 'x = 2',
      input: LINE_1X_0Y_N2,
      output: [[2, 0], [2, 4]]
    }, {
      title: 'x = 3',
      input: LINE_1X_0Y_N3,
      output: [[3, 0], [3, 4]]
    }, {
      title: 'x = 4',
      input: LINE_1X_0Y_N4,
      output: [[4, 0], [4, 4]]
    }, {
      title: 'x = 5',
      input: LINE_1X_0Y_N5,
      output: []
    }, {
      title: 'y = -1',
      input: LINE_0X_N1Y_N1,
      output: []
    }, {
      title: 'y = 0',
      input: LINE_0X_N1Y_0,
      output: [[-0, 0], [4, 0]]
    }, {
      title: 'y = 1',
      input: LINE_0X_N1Y_1,
      output: [[-0, 1], [4, 1]]
    }, {
      title: 'y = 2',
      input: LINE_0X_N1Y_2,
      output: [[-0, 2], [4, 2]]
    }, {
      title: 'y = 3',
      input: LINE_0X_N1Y_3,
      output: [[-0, 3], [4, 3]]
    }, {
      title: 'y = 4',
      input: LINE_0X_N1Y_4,
      output: [[-0, 4], [4, 4]]
    }, {
      title: 'y = 5',
      input: LINE_0X_N1Y_5,
      output: []
    }, {
      title: 'y = x - 1',
      input: LINE_1X_N1Y_N1,
      output: [[1, 0], [4, 3]]
    }, {
      title: 'y = x',
      input: LINE_1X_N1Y_0,
      output: [[0, 0], [4, 4]]
    }, {
      title: 'y = x + 1',
      input: LINE_1X_N1Y_1,
      output: [[-0, 1], [3, 4]]
    }, {
      title: 'y = x + 2',
      input: LINE_1X_N1Y_2,
      output: [[-0, 2], [2, 4]]
    }, {
      title: 'y = x + 3',
      input: LINE_1X_N1Y_3,
      output: [[-0, 3], [1, 4]]
    }, {
      title: 'y = x + 4',
      input: LINE_1X_N1Y_4,
      output: [[0, 4]]
    }, {
      title: 'y = x + 5',
      input: LINE_1X_N1Y_5,
      output: []
    }, {
      title: 'y = -x - 1',
      input: LINE_N1X_N1Y_N1,
      output: []
    }, {
      title: 'y = -x',
      input: LINE_N1X_N1Y_0,
      output: [[-0, 0]]
    }, {
      title: 'y = -x + 1',
      input: LINE_N1X_N1Y_1,
      output: [[-0, 1], [1, 0]]
    }, {
      title: 'y = -x + 2',
      input: LINE_N1X_N1Y_2,
      output: [[-0, 2], [2, 0]]
    }, {
      title: 'y = -x + 3',
      input: LINE_N1X_N1Y_3,
      output: [[-0, 3], [3, 0]]
    }, {
      title: 'y = -x + 4',
      input: LINE_N1X_N1Y_4,
      output: [[-0, 4], [4, 0]]
    }, {
      title: 'y = -x + 5',
      input: LINE_N1X_N1Y_5,
      output: [[1, 4], [4, 1]]
    }
  ]
} satisfies ITestPath;
