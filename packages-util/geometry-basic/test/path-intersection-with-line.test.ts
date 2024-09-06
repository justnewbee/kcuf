import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathIntersectionWithLine
} from '../src';

import {
  // TEST_PATH_0,
  // TEST_PATH_1,
  // TEST_PATH_2,
  // TEST_PATH_3_REGULAR,
  // TEST_PATH_3_ISOSCELES_RIGHT,
  // TEST_PATH_4_RECTANGLE,
  TEST_PATH_4_SQUARE,
  // TEST_PATH_4_DIAMOND,
  // TEST_PATH_4_CROSSING,
  // TEST_PATH_5_CONVEX
  // TEST_PATH_6_CONCAVE
} from './const';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const {
    intersectionWithLineCases
  } = TEST_PATH_4_SQUARE;
  
  describe('pathIntersectionWithLine(path: Path, line: Line): Point[]', () => {
    test('x = -1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['x = -1'].input)).toEqual(intersectionWithLineCases['x = -1'].output);
    });
    test('x = 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['x = 1'].input)).toEqual(intersectionWithLineCases['x = 1'].output);
    });
    test('y = 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = 1'].input)).toEqual(intersectionWithLineCases['y = 1'].output);
    });
    test('y = -1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = -1'].input)).toEqual(intersectionWithLineCases['y = -1'].output);
    });
    test('y = x', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = x'].input)).toEqual(intersectionWithLineCases['y = x'].output);
    });
    test('y = x + 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = x + 1'].input)).toEqual(intersectionWithLineCases['y = x + 1'].output);
    });
    test('y = x - 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = x - 1'].input)).toEqual(intersectionWithLineCases['y = x - 1'].output);
    });
    test('y = -x', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = -x'].input)).toEqual(intersectionWithLineCases['y = -x'].output);
    });
    test('y = -x + 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = -x + 1'].input)).toEqual(intersectionWithLineCases['y = -x + 1'].output);
    });
    test('y = -x - 1', () => {
      expect(pathIntersectionWithLine(TEST_PATH_4_SQUARE.path, intersectionWithLineCases['y = -x - 1'].input)).toEqual(intersectionWithLineCases['y = -x - 1'].output);
    });
  });
});