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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_REGULAR,
  // PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_4_SQUARE,
  PATH_INFO_4_RECTANGLE,
  PATH_INFO_4_DIAMOND,
  PATH_INFO_4_CROSSING,
  PATH_INFO_5_CONVEX,
  PATH_INFO_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathEdgeCenterPoints(path: Path): Point | null', () => {
    expect(pathEdgeCenterPoints(PATH_INFO_0.path)).toEqual(PATH_INFO_0.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_1.path)).toEqual(PATH_INFO_1.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_2.path)).toEqual(PATH_INFO_2.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_3_REGULAR.path)).toEqual(PATH_INFO_3_REGULAR.ecp);
    // expect(pathEdgeCenterPoints(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_4_SQUARE.path)).toEqual(PATH_INFO_4_SQUARE.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_4_RECTANGLE.path)).toEqual(PATH_INFO_4_RECTANGLE.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_4_DIAMOND.path)).toEqual(PATH_INFO_4_DIAMOND.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_4_CROSSING.path)).toEqual(PATH_INFO_4_CROSSING.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_5_CONVEX.path)).toEqual(PATH_INFO_5_CONVEX.ecp);
    expect(pathEdgeCenterPoints(PATH_INFO_6_CONCAVE.path)).toEqual(PATH_INFO_6_CONCAVE.ecp);
  });
});