import {
  describe,
  expect,
  test
} from 'vitest';

import {
  intersectionLineWithPath
} from '../src';

import {
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  // TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE
  // TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX
  // TEST_PATH_6_CONCAVE
} from './const';

describe('intersectionLineWithPath(line: Line, path: Path): Point[]', () => {
  describe(TEST_PATH_4_SQUARE.title, () => {
    TEST_PATH_4_SQUARE.intersectionWithLine.forEach(v => {
      test(v.title, () => {
        expect(intersectionLineWithPath(v.input, TEST_PATH_4_SQUARE.path)).toEqual(v.output);
      });
    });
  });
});
