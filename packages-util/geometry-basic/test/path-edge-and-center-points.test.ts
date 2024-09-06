import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathEdgeCenterPoints
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_DIAMOND,
  TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathEdgeCenterPoints(path: Path): Point | null', () => {
    expect(pathEdgeCenterPoints(TEST_PATH_0.path)).toEqual(TEST_PATH_0.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_1.path)).toEqual(TEST_PATH_1.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_2.path)).toEqual(TEST_PATH_2.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.ecp);
    // expect(pathEdgeCenterPoints(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.ecp);
    expect(pathEdgeCenterPoints(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.ecp);
  });
});