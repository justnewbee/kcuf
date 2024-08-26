import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  roundCoords
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('roundCoords(point: Point, precision = 1)', () => {
    test('Round with default precision 1', () => {
      expect(roundCoords([1.1, 2.2])).toEqual([1.1, 2.2]);
      expect(roundCoords([1.11, 2.27])).toEqual([1.1, 2.3]);
    });
    
    test('Round with precision 0', () => {
      expect(roundCoords([1.1, 2.2], 0)).toEqual([1, 2]);
      expect(roundCoords([1.11, 2.27], 0)).toEqual([1, 2]);
    });
    
    test('Round with precision 2', () => {
      expect(roundCoords([1.1, 2.2], 2)).toEqual([1.1, 2.2]);
      expect(roundCoords([1.11, 2.27], 2)).toEqual([1.11, 2.27]);
    });
  });
});