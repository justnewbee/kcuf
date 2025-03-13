import {
  describe,
  expect,
  test
} from 'vitest';

import {
  segmentLine
} from '../src';

describe('segmentLine', () => {
  describe('segmentLine(segment: Segment): LineCoefficients', () => {
    test('平行 x 轴', () => {
      expect(segmentLine([[0, 0], [5, 0]])).toEqual([0, -1, 0]);
      expect(segmentLine([[2, 2], [100, 2]])).toEqual([0, -1, 2]);
    });

    test('平行 y 轴', () => {
      expect(segmentLine([[0, 0], [0, 7]])).toEqual([1, 0, 0]);
      expect(segmentLine([[7, 2], [7, 100]])).toEqual([1, 0, -7]);
    });
    
    test('普通线段', () => {
      expect(segmentLine([[1, 1], [7, 7]])).toEqual([1, -1, 0]);
      expect(segmentLine([[2, 2], [8, 8]])).toEqual([1, -1, 0]);
      expect(segmentLine([[2, 4], [8, 10]])).toEqual([1, -1, 2]);
    });
  });
});
