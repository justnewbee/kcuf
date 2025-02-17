import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathCentroid
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_REGULAR,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  TEST_PATH_4_DIAMOND
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX,
  // TEST_PATH_6_CONCAVE
} from './const';

describe('pathCentroid(path: Path): Segment[]', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathCentroid(TEST_PATH_0.path)).toEqual(TEST_PATH_0.centroid);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathCentroid(TEST_PATH_1.path)).toEqual(TEST_PATH_1.centroid);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathCentroid(TEST_PATH_2.path)).toEqual(TEST_PATH_2.centroid);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathCentroid(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.centroid);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathCentroid(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.centroid);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathCentroid(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.centroid);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathCentroid(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.centroid);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathCentroid(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.centroid);
  });
  
  // test(TEST_PATH_4_CROSSING.title, () => {
  //   expect(pathCentroid(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.centroid);
  // });
  
  // test(TEST_PATH_5_CONVEX.title, () => {
  //   expect(pathCentroid(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.centroid);
  // });
  //
  // test(TEST_PATH_6_CONCAVE.title, () => {
  //   expect(pathCentroid(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.centroid);
  // });
});
