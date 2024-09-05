import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathHasSegmentCrossing
} from '../src';

import {
  PATH_INFO_0,
  PATH_INFO_1,
  PATH_INFO_2,
  PATH_INFO_3_ISOSCELES_RIGHT,
  PATH_INFO_RECTANGLE,
  PATH_INFO_SQUARE,
  PATH_INFO_CONVEX,
  PATH_INFO_CONCAVE,
  PATH_INFO_CROSSING
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathHasSegmentCrossing(path: Path): Point | null', () => {
    test('no crossing - 0, 1, 2, 3 points', () => {
      expect(pathHasSegmentCrossing(PATH_INFO_0.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_1.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_2.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_3_ISOSCELES_RIGHT.path)).toBe(false);
    });

    test('no crossing', () => {
      expect(pathHasSegmentCrossing(PATH_INFO_RECTANGLE.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_SQUARE.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_CONVEX.path)).toBe(false);
      expect(pathHasSegmentCrossing(PATH_INFO_CONCAVE.path)).toBe(false);
    });
    
    test('crossing', () => {
      expect(pathHasSegmentCrossing(PATH_INFO_CROSSING.path)).toBe(true);
      // expect(pathHasSegmentCrossing([[1778.2, 2404.7], [2070, 2700.4], [2996.1, 2303.5], [2308.6, 2598.1]])).toBe(true); // FIXME 这个应该是 true
    });
  });
});