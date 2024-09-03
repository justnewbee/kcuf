import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathArea
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathArea(path: Path): number', () => {
    test('path length 0', () => {
      expect(pathArea([])).toEqual(0);
    });
    
    test('path length 1', () => {
      expect(pathArea([[1, 1]])).toEqual(0);
      expect(pathArea([[1, 2]])).toEqual(0);
    });
    
    test('path length 2', () => {
      expect(pathArea([[1, 1], [2, 2]])).toEqual(0);
      expect(pathArea([[2, 2], [6, 8]])).toEqual(0);
    });
    
    test('path length > 2', () => {
      expect(pathArea([[0, 0], [2, 0], [2, 2]])).toEqual(2);
      expect(pathArea([[0, 0], [2, 0], [2, 2], [0, 2]])).toEqual(4);
      expect(pathArea([[0, 0], [2, 0], [2, 2], [1, 3], [0, 2]])).toEqual(5);
    });
  });
});