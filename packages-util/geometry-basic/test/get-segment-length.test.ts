import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  getSegmentLength
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getSegmentLength(segment: Segment): number', () => {
    test('勾三股四', () => {
      expect(getSegmentLength([[0, 0], [3, 4]])).toEqual(5);
      expect(getSegmentLength([[0, 0], [4, 3]])).toEqual(5);
      expect(getSegmentLength([[1, 1.5], [4, 5.5]])).toEqual(5);
    });
    
    test('5² + 12² = 13²', () => {
      expect(getSegmentLength([[0, 0], [5, 12]])).toEqual(13);
    });
    
    test('7² + 24² = 25²', () => {
      expect(getSegmentLength([[0, 0], [7, 24]])).toEqual(25);
    });
    
    test('8² + 15² = 17²', () => {
      expect(getSegmentLength([[0, 0], [8, 15]])).toEqual(17);
    });
    
    test('9² + 12² = 15²', () => {
      expect(getSegmentLength([[0, 0], [9, 12]])).toEqual(15);
    });
    
    test('9² + 40² = 41²', () => {
      expect(getSegmentLength([[0, 0], [9, 40]])).toEqual(41);
    });
    
    test('11² + 60² = 61²', () => {
      expect(getSegmentLength([[0, 0], [11, 60]])).toEqual(61);
    });
    
    test('12² + 35² = 37²', () => {
      expect(getSegmentLength([[0, 0], [12, 35]])).toEqual(37);
    });
  });
});