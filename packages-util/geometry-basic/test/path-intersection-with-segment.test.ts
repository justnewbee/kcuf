import {
  describe,
  expect,
  test
} from 'vitest';

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

describe('pathIntersectionWithSegment(path: Path, segment: Segment, extended?: boolean): Point[]', () => {
  describe('5 convex', () => {
    TEST_PATH_5_CONVEX.intersectionWithSegment.forEach(v => {
      test(v.title, () => {
        expect(pathIntersectionWithSegment(TEST_PATH_5_CONVEX.path, v.input)).toEqual(v.output);
        expect(pathIntersectionWithSegment(TEST_PATH_5_CONVEX.path, v.input, true)).toEqual(v.outputExtended);
      });
    });
  })
});