import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleOfSegmentWithRespectToAxisX,
  angleOfSegmentWithRespectToAxisY
} from '../src';

describe('Angle of segment with respect to axis x & y', () => {
  describe('angleOfSegmentWithRespectToAxisY(segment: Segment): number', () => {
    test('±0°', () => {
      expect(angleOfSegmentWithRespectToAxisY([[7, 1], [7, 107]])).toEqual(-0);
      expect(angleOfSegmentWithRespectToAxisY([[7, 107], [7, 1]])).toEqual(0);
    });
    
    test('±45°', () => {
      expect(angleOfSegmentWithRespectToAxisY([[1, 1], [15, 15]])).toEqual(-Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisY([[15, 15], [1, 1]])).toEqual(-Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisY([[0, 1], [1, 0]])).toEqual(Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisY([[1, 17], [17, 1]])).toEqual(Math.PI / 4);
    });
    
    test('+90°', () => {
      expect(angleOfSegmentWithRespectToAxisY([[5, 7], [2, 7]])).toEqual(Math.PI / 2);
      expect(angleOfSegmentWithRespectToAxisY([[2, 7], [5, 7]])).toEqual(Math.PI / 2);
    });
  });
  
  describe('angleOfSegmentWithRespectToAxisX(segment: Segment): number', () => {
    test('±0°', () => {
      expect(angleOfSegmentWithRespectToAxisX([[2, 7], [5, 7]])).toEqual(0);
      expect(angleOfSegmentWithRespectToAxisX([[5, 7], [2, 7]])).toEqual(-0);
    });
    
    test('±45°', () => {
      expect(angleOfSegmentWithRespectToAxisX([[1, 1], [15, 15]])).toEqual(Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisX([[15, 15], [1, 1]])).toEqual(Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisX([[0, 1], [1, 0]])).toEqual(-Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisX([[1, 0], [0, 1]])).toEqual(-Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisX([[1, 17], [17, 1]])).toEqual(-Math.PI / 4);
      expect(angleOfSegmentWithRespectToAxisX([[17, 1], [1, 17]])).toEqual(-Math.PI / 4);
    });
    
    test('+90°', () => {
      expect(angleOfSegmentWithRespectToAxisX([[7, 1], [7, 107]])).toEqual(Math.PI / 2);
      expect(angleOfSegmentWithRespectToAxisX([[7, 107], [7, 1]])).toEqual(Math.PI / 2);
    });
  });
});