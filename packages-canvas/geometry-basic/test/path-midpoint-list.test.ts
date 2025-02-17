import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathMidpointList
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

describe('pathMidpointList(path: Path): Segment[]', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathMidpointList(TEST_PATH_0.path)).toEqual(TEST_PATH_0.midpoints);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathMidpointList(TEST_PATH_1.path)).toEqual(TEST_PATH_1.midpoints);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathMidpointList(TEST_PATH_2.path)).toEqual(TEST_PATH_2.midpoints);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathMidpointList(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.midpoints);
    expect(pathMidpointList(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.midpoints);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathMidpointList(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.midpoints);
    expect(pathMidpointList(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.midpoints);
    expect(pathMidpointList(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.midpoints);
    expect(pathMidpointList(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.midpoints);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathMidpointList(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.midpoints);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathMidpointList(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.midpoints);
  });
});
