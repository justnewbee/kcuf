import {
  describe,
  expect,
  test
} from 'vitest';

import {
  intersectionSegmentWithPath
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

describe('intersectionSegmentWithPath(path: Path, segment: Segment, options?): Point[]', () => {
  describe(TEST_PATH_5_CONVEX.title, () => {
    TEST_PATH_5_CONVEX.intersectionWithSegment.forEach(v => {
      test(v.title, () => {
        expect(intersectionSegmentWithPath(v.input, TEST_PATH_5_CONVEX.path)).toEqual(v.output);
      });
      
      test(`${v.title} - extended`, () => {
        expect(intersectionSegmentWithPath(v.input, TEST_PATH_5_CONVEX.path, {
          extended: true
        })).toEqual(v.outputExtended);
      });
    });
  });
});
