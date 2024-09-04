import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentToLine
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('segmentToLine(segment: Segment): LineCoefficients', () => {
    test('平行 x 轴', () => {
      expect(segmentToLine([[0, 0], [5, 0]])).toEqual([0, -1, 0]);
      expect(segmentToLine([[2, 2], [100, 2]])).toEqual([0, -1, 2]);
    });

    test('平行 y 轴', () => {
      expect(segmentToLine([[0, 0], [0, 7]])).toEqual([1, 0, 0]);
      expect(segmentToLine([[7, 2], [7, 100]])).toEqual([1, 0, -7]);
    });
    
    test('普通线段', () => {
      expect(segmentToLine([[1, 1], [7, 7]])).toEqual([1, -1, 0]);
      expect(segmentToLine([[2, 2], [8, 8]])).toEqual([1, -1, 0]);
      expect(segmentToLine([[2, 4], [8, 10]])).toEqual([1, -1, 2]);
    });
  });
});