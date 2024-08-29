import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  getAngleBetweenSegmentAndAxisX
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getAngleBetweenSegmentAndAxisX(segment: Segment): number', () => {
    test('±0°', () => {
      expect(getAngleBetweenSegmentAndAxisX([[2, 7], [5, 7]])).toEqual(0);
      expect(getAngleBetweenSegmentAndAxisX([[5, 7], [2, 7]])).toEqual(-0);
    });
    
    test('±45°', () => {
      expect(getAngleBetweenSegmentAndAxisX([[1, 1], [15, 15]])).toEqual(Math.PI / 4);
      expect(getAngleBetweenSegmentAndAxisX([[15, 15], [1, 1]])).toEqual(Math.PI / 4);
      expect(getAngleBetweenSegmentAndAxisX([[0, 1], [1, 0]])).toEqual(-Math.PI / 4);
      expect(getAngleBetweenSegmentAndAxisX([[1, 0], [0, 1]])).toEqual(-Math.PI / 4);
      expect(getAngleBetweenSegmentAndAxisX([[1, 17], [17, 1]])).toEqual(-Math.PI / 4);
      expect(getAngleBetweenSegmentAndAxisX([[17, 1], [1, 17]])).toEqual(-Math.PI / 4);
    });
    
    test('+90°', () => {
      expect(getAngleBetweenSegmentAndAxisX([[7, 1], [7, 107]])).toEqual(Math.PI / 2);
      expect(getAngleBetweenSegmentAndAxisX([[7, 107], [7, 1]])).toEqual(Math.PI / 2);
    });
  });
});