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
  TEST_PATH_3_REGULAR,
  TEST_PATH_4_CROSSING,
  TEST_PATH_4_DIAMOND,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe('pathHasSegmentCrossing(path: Path): Point | null', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_0.path)).toBe(false);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_1.path)).toBe(false);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_2.path)).toBe(false);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_3_REGULAR.path)).toBe(false);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_3_ISOSCELES_RIGHT.path)).toBe(false);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_RECTANGLE.path)).toBe(false);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_SQUARE.path)).toBe(false);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_DIAMOND.path)).toBe(false);
  });
  
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_4_CROSSING.path)).toBe(true);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_5_CONVEX.path)).toBe(false);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathHasSegmentCrossing(TEST_PATH_6_CONCAVE.path)).toBe(false);
  });
  
  test('bug fix', () => {
    expect(pathHasSegmentCrossing([
      [101, 305],
      [215, 464],
      [478, 277],
      [359.481, 361.2701]
    ])).toBe(true);
  });
});