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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_TRIANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_CONVEX,
  PATH_INFO_CONCAVE,
  PATH_INFO_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathBbox(path: Path): [Point, Point]', () => {
    expect(pathBbox(PATH_INFO_0.path)).toEqual(PATH_INFO_0.bbox);
    expect(pathBbox(PATH_INFO_1.path)).toEqual(PATH_INFO_1.bbox);
    expect(pathBbox(PATH_INFO_2.path)).toEqual(PATH_INFO_2.bbox);
    expect(pathBbox(PATH_INFO_TRIANGLE.path)).toEqual(PATH_INFO_TRIANGLE.bbox);
    expect(pathBbox(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.bbox);
    expect(pathBbox(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.bbox);
    expect(pathBbox(PATH_INFO_CONVEX.path)).toEqual(PATH_INFO_CONVEX.bbox);
    expect(pathBbox(PATH_INFO_CONCAVE.path)).toEqual(PATH_INFO_CONCAVE.bbox);
    expect(pathBbox(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.bbox);
  });
});