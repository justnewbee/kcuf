import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  getSegmentInsidePolygonLength
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getSegmentInsidePolygonLength(segment: Segment, path: Path): number', () => {
    test('Outside', () => {
      expect(getSegmentInsidePolygonLength([
        [1, 2],
        [2, 5]
      ], [
        [3, 2],
        [4, 5],
        [6, 10],
        [9, 7]
      ])).toEqual(0);
    });
    
    test('Inside', () => {
      expect(getSegmentInsidePolygonLength([
        [2, 2],
        [2, 4]
      ], [
        [0, 1],
        [6, 1.5],
        [6, 10],
        [0, 7]
      ])).toEqual(2);
      
      expect(getSegmentInsidePolygonLength([
        [613.4, 1659.2],
        [1442.4, 635.6]
      ], [
        [1229, 1889],
        [1233.2, 2345.3],
        [1472.3, 2343.6],
        [1472.3, 2126.3],
        [2139, 2130],
        [2142.9, 1887.8]
      ])).toEqual(0);
      
      expect(getSegmentInsidePolygonLength([
        [613.4, 1659.2],
        [1442.4, 635.6]
      ], [
        [197.3, 1659.2],
        [201.8, 627.8],
        [3744.4, 650.2],
        [3748.9, 937.2],
        [2618.8, 1659.2]
      ])).toBeGreaterThan(10);
    });
  });
});