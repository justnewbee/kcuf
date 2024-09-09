import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathSegmentList
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_DIAMOND,
  TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe('pathSegmentList(path: Path): Segment[]', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathSegmentList(TEST_PATH_0.path)).toEqual(TEST_PATH_0.segments);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathSegmentList(TEST_PATH_1.path)).toEqual(TEST_PATH_1.segments);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathSegmentList(TEST_PATH_2.path)).toEqual(TEST_PATH_2.segments);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathSegmentList(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.segments);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathSegmentList(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.segments);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathSegmentList(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.segments);
  });
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathSegmentList(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.segments);
  });
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathSegmentList(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.segments);
  });
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathSegmentList(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.segments);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathSegmentList(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.segments);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathSegmentList(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.segments);
  });
});