import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathMidpointList
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE,
  TEST_PATH_4_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathMidpointList(path: Path): Segment[]', () => {
    expect(pathMidpointList(TEST_PATH_0.path)).toEqual(TEST_PATH_0.midpoints);
    expect(pathMidpointList(TEST_PATH_1.path)).toEqual(TEST_PATH_1.midpoints);
    expect(pathMidpointList(TEST_PATH_2.path)).toEqual(TEST_PATH_2.midpoints);
    expect(pathMidpointList(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.midpoints);
    expect(pathMidpointList(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.midpoints);
    expect(pathMidpointList(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.midpoints);
    expect(pathMidpointList(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.midpoints);
    expect(pathMidpointList(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.midpoints);
    expect(pathMidpointList(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.midpoints);
  });
});