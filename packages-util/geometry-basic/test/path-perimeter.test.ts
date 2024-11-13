import {
  describe,
  test,
  expect
} from 'vitest';

import {
  pathPerimeter
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

describe('pathPerimeter(path: Path): number', () => {
  test(TEST_PATH_0.title, () => {
    expect(pathPerimeter(TEST_PATH_0.path)).toEqual(TEST_PATH_0.perimeter);
  });
  
  test(TEST_PATH_1.title, () => {
    expect(pathPerimeter(TEST_PATH_1.path)).toEqual(TEST_PATH_1.perimeter);
  });
  
  test(TEST_PATH_2.title, () => {
    expect(pathPerimeter(TEST_PATH_2.path)).toEqual(TEST_PATH_2.perimeter);
  });
  
  test(TEST_PATH_3_REGULAR.title, () => {
    expect(pathPerimeter(TEST_PATH_3_REGULAR.path)).toEqual(TEST_PATH_3_REGULAR.perimeter);
  });
  
  test(TEST_PATH_3_ISOSCELES_RIGHT.title, () => {
    expect(pathPerimeter(TEST_PATH_3_ISOSCELES_RIGHT.path)).toEqual(TEST_PATH_3_ISOSCELES_RIGHT.perimeter);
  });
  
  test(TEST_PATH_4_RECTANGLE.title, () => {
    expect(pathPerimeter(TEST_PATH_4_RECTANGLE.path)).toEqual(TEST_PATH_4_RECTANGLE.perimeter);
  });
  
  test(TEST_PATH_4_SQUARE.title, () => {
    expect(pathPerimeter(TEST_PATH_4_SQUARE.path)).toEqual(TEST_PATH_4_SQUARE.perimeter);
  });
  
  test(TEST_PATH_4_DIAMOND.title, () => {
    expect(pathPerimeter(TEST_PATH_4_DIAMOND.path)).toEqual(TEST_PATH_4_DIAMOND.perimeter);
  });
  
  test(TEST_PATH_4_CROSSING.title, () => {
    expect(pathPerimeter(TEST_PATH_4_CROSSING.path)).toEqual(TEST_PATH_4_CROSSING.perimeter);
  });
  
  test(TEST_PATH_5_CONVEX.title, () => {
    expect(pathPerimeter(TEST_PATH_5_CONVEX.path)).toEqual(TEST_PATH_5_CONVEX.perimeter);
  });
  
  test(TEST_PATH_6_CONCAVE.title, () => {
    expect(pathPerimeter(TEST_PATH_6_CONCAVE.path)).toEqual(TEST_PATH_6_CONCAVE.perimeter);
  });
});
