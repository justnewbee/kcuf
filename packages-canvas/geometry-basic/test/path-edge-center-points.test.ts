import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathEdgeCenterPoints
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

describe('pathEdgeCenterPoints(path: Path): Point | null', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_0.path)).toEqual(TEST_PATH_0.ecp);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_1.path)).toEqual(TEST_PATH_1.ecp);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_2.path)).toEqual(TEST_PATH_2.ecp);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.ecp);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.ecp);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.ecp);
  });
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.ecp);
  });
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.ecp);
  });
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.ecp);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.ecp);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathEdgeCenterPoints(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.ecp);
  });
});
