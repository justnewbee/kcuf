import {
  describe,
  expect,
  test
} from 'vitest';

import {
  segmentLength
} from '../src';

describe('segmentLength(segment: Segment): number', () => {
  test('勾三股四', () => {
    expect(segmentLength([[0, 0], [3, 4]])).toEqual(5);
    expect(segmentLength([[0, 0], [4, 3]])).toEqual(5);
    expect(segmentLength([[1, 1.5], [4, 5.5]])).toEqual(5);
  });
  
  test('5² + 12² = 13²', () => {
    expect(segmentLength([[0, 0], [5, 12]])).toEqual(13);
  });
  
  test('7² + 24² = 25²', () => {
    expect(segmentLength([[0, 0], [7, 24]])).toEqual(25);
  });
  
  test('8² + 15² = 17²', () => {
    expect(segmentLength([[0, 0], [8, 15]])).toEqual(17);
  });
  
  test('9² + 12² = 15²', () => {
    expect(segmentLength([[0, 0], [9, 12]])).toEqual(15);
  });
  
  test('9² + 40² = 41²', () => {
    expect(segmentLength([[0, 0], [9, 40]])).toEqual(41);
  });
  
  test('11² + 60² = 61²', () => {
    expect(segmentLength([[0, 0], [11, 60]])).toEqual(61);
  });
  
  test('12² + 35² = 37²', () => {
    expect(segmentLength([[0, 0], [12, 35]])).toEqual(37);
  });
});
