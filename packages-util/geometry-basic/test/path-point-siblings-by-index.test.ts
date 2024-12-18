import {
  describe,
  expect,
  test
} from 'vitest';

import {
  pathPointSiblingsByIndex
} from '../src';

import {
  TEST_PATH_0,
  TEST_PATH_1,
  TEST_PATH_2,
  TEST_PATH_3_ISOSCELES_RIGHT,
  TEST_PATH_3_REGULAR,
  TEST_PATH_4_RECTANGLE
} from './const';

describe('pathPointSiblingsByIndex(path: Path, index: number): [] | [Point] | [Point, Point]', () => {
  test('empty when path length <= 1', () => {
    expect(pathPointSiblingsByIndex(TEST_PATH_0.path, 0)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_1.path, 0)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_1.path, -1)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_1.path, 2)).toEqual([]);
  });
  
  test('empty when index out of bound', () => {
    expect(pathPointSiblingsByIndex(TEST_PATH_0.path, -1)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_1.path, -2)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, -3)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_3_ISOSCELES_RIGHT.path, -4)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, 3)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, 4)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, 30)).toEqual([]);
    expect(pathPointSiblingsByIndex(TEST_PATH_3_REGULAR.path, 40)).toEqual([]);
  });
  
  test('one singling only when path length 2', () => {
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, 0)).toEqual([TEST_PATH_2.path[1]]);
    expect(pathPointSiblingsByIndex(TEST_PATH_2.path, 1)).toEqual([TEST_PATH_2.path[0]]);
  });
  
  test('two siblings when path length > 2', () => {
    expect(pathPointSiblingsByIndex(TEST_PATH_4_RECTANGLE.path, 0)).toEqual([TEST_PATH_4_RECTANGLE.path[TEST_PATH_4_RECTANGLE.path.length - 1], TEST_PATH_4_RECTANGLE.path[1]]);
    expect(pathPointSiblingsByIndex(TEST_PATH_4_RECTANGLE.path, 2)).toEqual([TEST_PATH_4_RECTANGLE.path[1], TEST_PATH_4_RECTANGLE.path[3]]);
    expect(pathPointSiblingsByIndex(TEST_PATH_4_RECTANGLE.path, TEST_PATH_4_RECTANGLE.path.length - 1))
        .toEqual([TEST_PATH_4_RECTANGLE.path[TEST_PATH_4_RECTANGLE.path.length - 2], TEST_PATH_4_RECTANGLE.path[0]]);
  });
});