import {
  describe,
  expect,
  test
} from 'vitest';

import {
  roundCoords
} from '../src';

describe('roundCoords(point: Point, precision = 1)', () => {
  test('Round with default precision 10', () => {
    expect(roundCoords([1.1, 2.2])).toEqual([1.1, 2.2]);
    expect(roundCoords([1.13, 2.86])).toEqual([1.13, 2.86]);
    expect(roundCoords([1.135, 2.864])).toEqual([1.135, 2.864]);
    expect(roundCoords([1.1357, 2.8642])).toEqual([1.1357, 2.8642]);
    expect(roundCoords([1.13579, 2.86421])).toEqual([1.13579, 2.86421]);
  });
  
  test('Round with precision 0', () => {
    expect(roundCoords([1.1, 2.2], 0)).toEqual([1, 2]);
    expect(roundCoords([1.11, 2.27], 0)).toEqual([1, 2]);
  });
  
  test('Round with precision 2', () => {
    expect(roundCoords([1.1, 2.2], 2)).toEqual([1.1, 2.2]);
    expect(roundCoords([1.11, 2.27], 2)).toEqual([1.11, 2.27]);
  });
  
  test('Round with precision 4', () => {
    expect(roundCoords([1.1, 2.2], 4)).toEqual([1.1, 2.2]);
    expect(roundCoords([1.13, 2.86], 4)).toEqual([1.13, 2.86]);
    expect(roundCoords([1.135, 2.864], 4)).toEqual([1.135, 2.864]);
    expect(roundCoords([1.1357, 2.8642], 4)).toEqual([1.1357, 2.8642]);
    expect(roundCoords([1.13579, 2.86421], 4)).toEqual([1.1358, 2.8642]);
  });
});
