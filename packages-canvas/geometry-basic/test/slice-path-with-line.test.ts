import {
  describe,
  expect,
  test
} from 'vitest';

import {
  slicePathWithLine
} from '../src';

import {
  LINE_0X_N1Y_0,
  LINE_0X_N1Y_1,
  LINE_0X_N1Y_2,
  LINE_0X_N1Y_3,
  LINE_0X_N1Y_4,
  LINE_0X_N1Y_5,
  LINE_0X_N1Y_N1,
  LINE_1X_0Y_0,
  LINE_1X_0Y_1,
  LINE_1X_0Y_N1,
  LINE_1X_0Y_N2,
  LINE_1X_0Y_N3,
  LINE_1X_0Y_N4,
  LINE_1X_0Y_N5,
  LINE_1X_N1Y_0,
  LINE_1X_N1Y_1,
  LINE_1X_N1Y_2,
  LINE_1X_N1Y_3,
  LINE_1X_N1Y_4,
  LINE_1X_N1Y_5,
  LINE_1X_N1Y_N1,
  LINE_N1X_N1Y_0,
  LINE_N1X_N1Y_1,
  LINE_N1X_N1Y_2,
  LINE_N1X_N1Y_3,
  LINE_N1X_N1Y_4,
  LINE_N1X_N1Y_5,
  LINE_N1X_N1Y_N1,
  TEST_PATH_4_SQUARE
} from './const';

describe('pathSliceByLine(path: Path, line: Line): Point[]', () => {
  test('x = -1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_1)).toBeNull();
  });
  
  test('x = 0', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_0)).toBeNull();
  });
  
  test('x = 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_N1)).toEqual([
      [[0, 0], [1, 0], [1, 4], [0, 4]],
      [[1, 0], [4, 0], [4, 4], [1, 4]]
    ]);
  });
  
  test('x = 2', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_N2)).toEqual([
      [[0, 0], [2, 0], [2, 4], [0, 4]],
      [[2, 0], [4, 0], [4, 4], [2, 4]]
    ]);
  });
  
  test('x = 3', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_N3)).toEqual([
      [[0, 0], [3, 0], [3, 4], [0, 4]],
      [[3, 0], [4, 0], [4, 4], [3, 4]]
    ]);
  });
  
  test('x = 4', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_N4)).toBeNull();
  });
  
  test('x = 5', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_0Y_N5)).toBeNull();
  });
  
  test('y = -1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_N1)).toBeNull();
  });
  
  test('y = 0', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_0)).toBeNull();
  });
  
  test('y = 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_1)).toEqual([
      [[0, 0], [4, 0], [4, 1], [0, 1]],
      [[4, 1], [4, 4], [0, 4], [0, 1]]
    ]);
  });
  
  test('y = 2', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_2)).toEqual([
      [[0, 0], [4, 0], [4, 2], [0, 2]],
      [[4, 2], [4, 4], [0, 4], [0, 2]]
    ]);
  });
  
  test('y = 3', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_3)).toEqual([
      [[0, 0], [4, 0], [4, 3], [0, 3]],
      [[4, 3], [4, 4], [0, 4], [0, 3]]
    ]);
  });
  
  test('y = 4', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_4)).toBeNull();
  });
  
  test('y = 5', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_0X_N1Y_5)).toBeNull();
  });
  
  test('y = x - 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_N1)).toEqual([
      [[0, 0], [1, 0], [4, 3], [4, 4], [0, 4]],
      [[1, 0], [4, 0], [4, 3]]
    ]);
  });
  
  test('y = x', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_0)).toEqual([
      [[0, 0], [4, 4], [0, 4]],
      [[0, 0], [4, 0], [4, 4]]
    ]);
  });
  
  test('y = x + 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_1)).toEqual([
      [[3, 4], [0, 4], [0, 1]],
      [[0, 0], [4, 0], [4, 4], [3, 4], [0, 1]]
    ]);
  });
  
  test('y = x + 2', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_2)).toEqual([
      [[2, 4], [0, 4], [0, 2]],
      [[0, 0], [4, 0], [4, 4], [2, 4], [0, 2]]
    ]);
  });
  
  test('y = x + 3', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_3)).toEqual([
      [[1, 4], [0, 4], [0, 3]],
      [[0, 0], [4, 0], [4, 4], [1, 4], [0, 3]]
    ]);
  });
  
  test('y = x + 4', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_4)).toBeNull();
  });
  
  test('y = x + 5', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_1X_N1Y_5)).toBeNull();
  });
  
  test('y = -x - 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_N1)).toBeNull();
  });
  
  test('y = -x', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_0)).toBeNull();
  });
  
  test('y = -x + 1', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_1)).toEqual([
      [[0, 0], [1, 0], [0, 1]],
      [[1, 0], [4, 0], [4, 4], [0, 4], [0, 1]]
    ]);
  });
  
  test('y = -x + 2', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_2)).toEqual([
      [[0, 0], [2, 0], [0, 2]],
      [[2, 0], [4, 0], [4, 4], [0, 4], [0, 2]]
    ]);
  });
  
  test('y = -x + 3', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_3)).toEqual([
      [[0, 0], [3, 0], [0, 3]],
      [[3, 0], [4, 0], [4, 4], [0, 4], [0, 3]]
    ]);
  });
  
  test('y = -x + 4', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_4)).toEqual([
      [[0, 0], [4, 0], [0, 4]],
      [[4, 0], [4, 4], [0, 4]]
    ]);
  });
  
  test('y = -x + 5', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, LINE_N1X_N1Y_5)).toEqual([
      [[0, 0], [4, 0], [4, 1], [1, 4], [0, 4]],
      [[4, 1], [4, 4], [1, 4]]
    ]);
  });
  
  test('y = 2x 仅经过 #0 个点', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, [2, -1, 0])).toEqual([
      [[0, 0], [2, 4], [0, 4]],
      [[0, 0], [4, 0], [4, 4], [2, 4]]
    ]);
  });
  
  test('y = -2x + 8 仅经过 #1 个点', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, [-2, -1, 8])).toEqual([
      [[0, 0], [4, 0], [2, 4], [0, 4]],
      [[4, 0], [4, 4], [2, 4]]
    ]);
  });
  
  test('y = 2x - 4 仅经过 #2 个点', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, [2, -1, -4])).toEqual([
      [[0, 0], [2, 0], [4, 4], [0, 4]],
      [[2, 0], [4, 0], [4, 4]]
    ]);
  });
  
  test('y = -2x + 4 仅经过 #3 个点', () => {
    expect(slicePathWithLine(TEST_PATH_4_SQUARE.path, [-2, -1, 4])).toEqual([
      [[0, 0], [2, 0], [0, 4]],
      [[2, 0], [4, 0], [4, 4], [0, 4]]
    ]);
  });
  
  // test('buggy', () => {
  //   expect(pathSliceByLine([
  //     [568.5484, 713.7097],
  //     [844.7580181607341, 1028.2257637450691],
  //     [1121.8725966632207, 475.0119066613324],
  //     [999.2907, 335.4296]
  //   ], [-0.32448641788008176, -1, 1302.3382973955424])).toEqual([
  //     [[844.7580389115467, 1028.225787373732], [844.7580181607341, 1028.2257637450691], [844.7579999999992, 1028.2258000000004]], // 有 BUG
  //     [[568.5484, 713.7097], [844.7580389115467, 1028.225787373732], [844.7579999999992, 1028.2258000000004], [1121.8725966632207, 475.0119066613324], [999.2907, 335.4296]]
  //   ]);
  // });
});
