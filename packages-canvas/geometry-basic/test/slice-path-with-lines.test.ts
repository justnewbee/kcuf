import {
  describe,
  expect,
  test
} from 'vitest';

import {
  slicePathWithLines
} from '../src';

import {
  LINE_0X_N1Y_2,
  LINE_1X_0Y_N2,
  LINE_1X_N1Y_0,
  LINE_1X_N1Y_1,
  LINE_N1X_N1Y_3,
  LINE_N1X_N1Y_N1,
  TEST_PATH_4_SQUARE
} from './const';

describe('slicePathWithLines(path: Path, lines: Line[]): Point[]', () => {
  describe('不相交', () => {
    test('y = x & y = x + 1', () => {
      expect(slicePathWithLines(TEST_PATH_4_SQUARE.path, [
        LINE_1X_N1Y_0,
        LINE_1X_N1Y_1
      ])).toEqual([
        [[3, 4], [0, 4], [-0, 1]],
        [[0, 0], [4, 4], [3, 4], [-0, 1]],
        [[0, 0], [4, 0], [4, 4]]
      ]);
    });
  });
  
  describe('内部相交', () => {
    test('y = -x + 3 & y = x + 1', () => {
      expect(slicePathWithLines(TEST_PATH_4_SQUARE.path, [
        LINE_N1X_N1Y_3,
        LINE_1X_N1Y_1
      ])).toEqual([]);
      
      expect(slicePathWithLines(TEST_PATH_4_SQUARE.path, [
        LINE_0X_N1Y_2,
        LINE_1X_0Y_N2
      ])).toEqual([]);
    });
  });
  
  describe('一根在内，一根在外', () => {
    test('y = -x - 1 & y = x + 1', () => {
      expect(slicePathWithLines(TEST_PATH_4_SQUARE.path, [
        LINE_N1X_N1Y_N1,
        LINE_1X_N1Y_1
      ])).toEqual([
        [[3, 4], [0, 4], [-0, 1]],
        [[0, 0], [4, 0], [4, 4], [3, 4], [-0, 1]]
      ]);
    });
  });
  
  describe('交点在边上', () => {
    test('y = 4x & y = -4x / 3 + 16 / 3 → 交点 (1, 4)', () => {
      expect(slicePathWithLines(TEST_PATH_4_SQUARE.path, [
        [4, -1, 0],
        [-4 / 3, -1, 16 / 3]
      ])).toEqual([
        [[0, 0], [1, 4], [0, 4]],
        [[0, 0], [4, 0], [0.9999999999999998, 4]],
        [[4, 0], [4, 4], [0.9999999999999998, 4]]
      ]);
    });
  });
  
  // describe('交点在边上 with BUG', () => {
  //   test('should fix', () => {
  //     expect(slicePathWithLines([
  //       [568.5484, 713.7097],
  //       [1120.9677, 1342.7419],
  //       [1551.71, 964.4618],
  //       [999.2907, 335.4296]
  //     ], [
  //       [-1.9963361728324678, -1, 2714.6467526896095],
  //       [-0.32448641788008176, -1, 1302.3382973955424]
  //     ])).toEqual([
  //       [[844.7580389115467, 1028.225787373732], [844.7580181607341, 1028.2257637450691], [844.7579999999992, 1028.2258000000004]], // BUG
  //       [[568.5484, 713.7097], [844.7580389115467, 1028.225787373732], [844.7579999999992, 1028.2258000000004], [1121.8725966632207, 475.0119066613324], [999.2907, 335.4296]],
  //       [[844.7580181607341, 1028.2257637450691], [1120.9677, 1342.7419], [1551.71, 964.4618], [1121.8725966632207, 475.0119066613324]]
  //     ]);
  //   });
  // });
});
