import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  getSegmentIncludedAngle
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getSegmentIncludedAngle(segment1: Segment, segment2: Segment, orientationRegardless?: true): number', () => {
    test('水平平行同向 0', () => {
      expect(getSegmentIncludedAngle([[0, 0], [1, 0]], [[1, 1], [2, 1]])).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 1], [2, 2]])).toEqual(0);
    });
    
    test('竖直平行同向 0', () => {
      expect(getSegmentIncludedAngle([[3, 1], [3, -1]], [[5, 4], [5, 2]])).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 1], [2, 2]])).toEqual(0);
    });
    
    test('水平平行背向 π→0', () => {
      expect(getSegmentIncludedAngle([[0, 0], [1, 0]], [[2, 1], [1, 1]])).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 2], [2, 1]])).toEqual(0);
    });
    
    test('竖直平行背向 π→0', () => {
      expect(getSegmentIncludedAngle([[3, 1], [3, -1]], [[5, 2], [5, 4]])).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 2], [2, 1]])).toEqual(0);
    });
    
    test('45°', () => {
      expect(Math.abs(getSegmentIncludedAngle([[5, 0], [15, 0]], [[1, 1], [7, 7]]) - Math.PI / 4)).toBeLessThan(Number.EPSILON);
    });
    
    test('90°', () => {
      expect(Math.abs(getSegmentIncludedAngle([[1, 1], [15, 15]], [[0, 100], [100, 0]]) - Math.PI / 2)).toBeLessThan(Number.EPSILON);
    });
    
    test('135°→45°', () => {
      expect(Math.abs(getSegmentIncludedAngle([[5, 0], [15, 0]], [[10, 10], [7, 7]]) - Math.PI / 4)).toBeLessThan(Number.EPSILON);
    });
  });
  
  describe('getSegmentIncludedAngle(segment1: Segment, segment2: Segment, orientationRegardless: false): number', () => {
    test('水平平行同向 0', () => {
      expect(getSegmentIncludedAngle([[0, 0], [1, 0]], [[1, 1], [2, 1]], false)).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 1], [2, 2]], false)).toEqual(0);
    });
    
    test('竖直平行同向 0', () => {
      expect(getSegmentIncludedAngle([[3, 1], [3, -1]], [[5, 4], [5, 2]], false)).toEqual(0);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 1], [2, 2]], false)).toEqual(0);
    });
    
    test('水平平行背向 π', () => {
      expect(getSegmentIncludedAngle([[0, 0], [1, 0]], [[2, 1], [1, 1]], false)).toEqual(Math.PI);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 2], [2, 1]], false)).toEqual(Math.PI);
    });
    
    test('竖直平行背向 π', () => {
      expect(getSegmentIncludedAngle([[3, 1], [3, -1]], [[5, 2], [5, 4]], false)).toEqual(Math.PI);
      expect(getSegmentIncludedAngle([[1, 1], [1, 2]], [[2, 2], [2, 1]], false)).toEqual(Math.PI);
    });
    
    test('45°', () => {
      expect(getSegmentIncludedAngle([[5, 0], [15, 0]], [[1, 1], [7, 7]], false) - Math.PI / 4).toBeLessThan(Number.EPSILON);
    });
    
    test('90°', () => {
      expect(getSegmentIncludedAngle([[1, 1], [15, 15]], [[0, 100], [100, 0]], false) - Math.PI / 2).toBeLessThan(Number.EPSILON);
    });
    
    test('135°', () => {
      expect(getSegmentIncludedAngle([[5, 0], [15, 0]], [[10, 10], [7, 7]], false) - Math.PI * 3 / 4).toBeLessThan(Number.EPSILON);
    });
  });
});