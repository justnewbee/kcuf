import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathSplitByLines
} from '../src';

import {
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  // TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  // TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX
  // TEST_PATH_6_CONCAVE
} from './const';

describe('pathSplitByLines(path: Path, lines: Line[]): Point[]', () => {
  describe('square', () => {
    TEST_PATH_4_SQUARE.splitByLines.forEach(v => {
      test(v.title, () => {
        expect(pathSplitByLines(TEST_PATH_4_SQUARE.path, v.input)).toEqual(v.output);
      });
    });
  });
});