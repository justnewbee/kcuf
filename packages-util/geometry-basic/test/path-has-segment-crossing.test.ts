import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathHasSegmentCrossing
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE,
  TEST_PATH_3_REGULAR,
  TEST_PATH_4_DIAMOND
} from './const';

describe('pathHasSegmentCrossing(path: Path): Point | null', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_0.path)).toEqual(false);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_1.path)).toEqual(false);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_2.path)).toEqual(false);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_3_REGULAR.path)).toEqual(false);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(false);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_RECTANGLE.path)).toEqual(false);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_SQUARE.path)).toEqual(false);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_DIAMOND.path)).toEqual(false);
  });
  
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_CROSSING.path)).toEqual(true);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_5_CONVEX.path)).toEqual(false);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_6_CONCAVE.path)).toEqual(false);
  });
});