import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathIntersectionWithSegment
} from '../src';

import {
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  // TEST_PATH_4_RECTANGLE,
  // TEST_PATH_4_SQUARE,
  // TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX
  // TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathIntersectionWithSegment(segment1: Segment, path: Path, extended?: boolean): Point[]', () => {
    TEST_PATH_5_CONVEX.intersection.forEach(v => {
      expect(pathIntersectionWithSegment(TEST_PATH_5_CONVEX.path, v.input)).toEqual(v.output);
      expect(pathIntersectionWithSegment(TEST_PATH_5_CONVEX.path, v.input, true)).toEqual(v.outputExtended);
    });
  });
});