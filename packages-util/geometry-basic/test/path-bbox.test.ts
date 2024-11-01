import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathBbox
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_DIAMOND,
  TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe('pathBbox(path: Path): [Point, Point]', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathBbox(TEST_PATH_0.path)).toEqual(TEST_PATH_0.bbox);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathBbox(TEST_PATH_1.path)).toEqual(TEST_PATH_1.bbox);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathBbox(TEST_PATH_2.path)).toEqual(TEST_PATH_2.bbox);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathBbox(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.bbox);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathBbox(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.bbox);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathBbox(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.bbox);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathBbox(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.bbox);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathBbox(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.bbox);
  });
  
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathBbox(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.bbox);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathBbox(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.bbox);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathBbox(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.bbox);
  });
});