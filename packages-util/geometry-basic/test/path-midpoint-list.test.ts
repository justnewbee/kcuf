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
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_SQUARE,
  PATH_INFO_RECTANGLE,
  PATH_INFO_CONVEX,
  PATH_INFO_CONCAVE,
  PATH_INFO_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathMidpointList(path: Path): Segment[]', () => {
    expect(pathMidpointList(PATH_INFO_0.path)).toEqual(PATH_INFO_0.midpoints);
    expect(pathMidpointList(PATH_INFO_1.path)).toEqual(PATH_INFO_1.midpoints);
    expect(pathMidpointList(PATH_INFO_2.path)).toEqual(PATH_INFO_2.midpoints);
    expect(pathMidpointList(PATH_INFO_3_ISOSCELES_RIGHT.path)).toEqual(PATH_INFO_3_ISOSCELES_RIGHT.midpoints);
    expect(pathMidpointList(PATH_INFO_SQUARE.path)).toEqual(PATH_INFO_SQUARE.midpoints);
    expect(pathMidpointList(PATH_INFO_RECTANGLE.path)).toEqual(PATH_INFO_RECTANGLE.midpoints);
    expect(pathMidpointList(PATH_INFO_CONVEX.path)).toEqual(PATH_INFO_CONVEX.midpoints);
    expect(pathMidpointList(PATH_INFO_CONCAVE.path)).toEqual(PATH_INFO_CONCAVE.midpoints);
    expect(pathMidpointList(PATH_INFO_CROSSING.path)).toEqual(PATH_INFO_CROSSING.midpoints);
  });
});