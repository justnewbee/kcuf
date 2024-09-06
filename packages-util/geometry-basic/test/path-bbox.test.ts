import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathBbox
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_DIAMOND,
  TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathBbox(path: Path): [Point, Point]', () => {
    expect(pathBbox(TEST_PATH_0.path)).toEqual(TEST_PATH_0.bbox);
    expect(pathBbox(TEST_PATH_1.path)).toEqual(TEST_PATH_1.bbox);
    expect(pathBbox(TEST_PATH_2.path)).toEqual(TEST_PATH_2.bbox);
    expect(pathBbox(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.bbox);
    expect(pathBbox(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.bbox);
    expect(pathBbox(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.bbox);
    expect(pathBbox(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.bbox);
    expect(pathBbox(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.bbox);
    expect(pathBbox(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.bbox);
    expect(pathBbox(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.bbox);
    expect(pathBbox(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.bbox);
  });
});