import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleOfSegmentWithRespectToSegment
} from '../src';

describe('angleOfSegmentWithRespectToSegment(segment1: Segment, segment2: Segment, undirected?: boolean): number', () => {
  test('0°', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [2, 0]])).toBe(0);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [4, 1]])).toBe(0);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [2, 0]], true)).toBe(0);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [4, 1]], true)).toBe(0);
  });
  
  test('45° (π/4)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [1, 1]])).toBeCloseTo(Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [4, 4]])).toBeCloseTo(Math.PI / 4);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [1, 1]], true)).toBeCloseTo(Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [4, 4]], true)).toBeCloseTo(Math.PI / 4);
  });
  
  test('90° (π/2)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [0, 1]])).toBeCloseTo(Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [1, 7]])).toBeCloseTo(Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 1]], [[1, 0], [0, 1]])).toBeCloseTo(Math.PI / 2);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [0, 1]], true)).toBeCloseTo(Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [1, 7]], true)).toBeCloseTo(Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 1]], [[1, 0], [0, 1]], true)).toBeCloseTo(Math.PI / 2);
  });
  
  test('135° (3π/4)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [-1, 1]])).toBeCloseTo(3 * Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [0, 2]])).toBeCloseTo(3 * Math.PI / 4);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [-1, 1]], true)).toBeCloseTo(3 * Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 1], [0, 2]], true)).toBeCloseTo(3 * Math.PI / 4);
  });
  
  test('180° (π)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[2, 0], [0, 0]])).toBeCloseTo(Math.PI);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 1]], [[1, 2], [0, 1]])).toBeCloseTo(Math.PI);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[2, 0], [0, 0]], true)).toBeCloseTo(Math.PI);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 1]], [[1, 2], [0, 1]], true)).toBeCloseTo(Math.PI);
  });
  
  test('225° (5π/4)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [-1, -1]])).toBeCloseTo(5 * Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 2], [0, 1]])).toBeCloseTo(5 * Math.PI / 4);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [-1, -1]], true)).toBeCloseTo(3 * Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[1, 2], [0, 1]], true)).toBeCloseTo(3 * Math.PI / 4);
  });
  
  test('270° (3π/2)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [0, -1]])).toBeCloseTo(3 * Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 2], [0, 1]])).toBeCloseTo(3 * Math.PI / 2);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [0, -1]], true)).toBeCloseTo(Math.PI / 2);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 2], [0, 1]], true)).toBeCloseTo(Math.PI / 2);
  });
  
  test('315° (7π/4)', () => {
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [1, -1]])).toBeCloseTo(7 * Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[2, 2], [3, 1]])).toBeCloseTo(7 * Math.PI / 4);
    
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[0, 0], [1, -1]], true)).toBeCloseTo(Math.PI / 4);
    expect(angleOfSegmentWithRespectToSegment([[0, 0], [1, 0]], [[2, 2], [3, 1]], true)).toBeCloseTo(Math.PI / 4);
  });
});
