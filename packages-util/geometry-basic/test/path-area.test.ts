import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathArea
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
  // TEST_PATH_4_CROSSING,
  TEST_PATH_5_CONVEX,
  TEST_PATH_6_CONCAVE
} from './const';

describe('pathArea(path: Path): number', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathArea(TEST_PATH_0.path)).toEqual(TEST_PATH_0.area);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathArea(TEST_PATH_1.path)).toEqual(TEST_PATH_1.area);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathArea(TEST_PATH_2.path)).toEqual(TEST_PATH_2.area);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathArea(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.area);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathArea(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.area);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathArea(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.area);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathArea(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.area);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathArea(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.area);
  });
  
  // test(TEST_PATH_4_CROSSING.title, () => {
  //   expect(pathArea(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.area);
  // });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathArea(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.area);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathArea(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.area);
  });
});
