import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathSliceListByLines
} from '../src';

import {
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE
  // TEST_PATH_4_RECTANGLE,
  // TEST_PATH_5_CONVEX,
  // TEST_PATH_6_CONCAVE,
  // TEST_PATH_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathSliceListByLines(path: Path, lines: Lines): Path[]', () => {
    test('square', () => {
      expect(pathSliceListByLines(TEST_PATH_4_SQUARE.path, [])).toEqual([]);
    });
  });
});