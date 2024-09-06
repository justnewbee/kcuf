import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathSplitByLine
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
    splitByLineCases
  } = TEST_PATH_4_SQUARE;
  
  describe('pathSplitByLine(path: Path, line: Line): Point[]', () => {
    test('x = -1', () => {
      const theCase = splitByLineCases['x = -1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('x = 1', () => {
      const theCase = splitByLineCases['x = 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = 1', () => {
      const theCase = splitByLineCases['y = 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -1', () => {
      const theCase = splitByLineCases['y = -1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = 3', () => {
      const theCase = splitByLineCases['y = 3'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = x - 1', () => {
      const theCase = splitByLineCases['y = x - 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = x', () => {
      const theCase = splitByLineCases['y = x'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = x + 1', () => {
      const theCase = splitByLineCases['y = x + 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x - 1', () => {
      const theCase = splitByLineCases['y = -x - 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x', () => {
      const theCase = splitByLineCases['y = -x'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x + 1', () => {
      const theCase = splitByLineCases['y = -x + 1'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x + 2', () => {
      const theCase = splitByLineCases['y = -x + 2'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x + 3', () => {
      const theCase = splitByLineCases['y = -x + 3'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x + 4', () => {
      const theCase = splitByLineCases['y = -x + 4'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
    test('y = -x + 5', () => {
      const theCase = splitByLineCases['y = -x + 5'];
      
      expect(pathSplitByLine(TEST_PATH_4_SQUARE.path, theCase.input)).toEqual(theCase.output);
    });
  });
});