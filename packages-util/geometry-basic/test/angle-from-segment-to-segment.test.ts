import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleFromSegmentToSegment
} from '../src';

describe('angleFromSegmentToSegment(segment1: Segment, segment2: Segment): number', () => {
  test('0°', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [2, 0]])).toBe(0);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[1, 1], [4, 1]])).toBe(0);
  });
  
  test('45° (π/4)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [1, 1]])).toBeCloseTo(Math.PI / 4);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[1, 1], [4, 4]])).toBeCloseTo(Math.PI / 4);
  });
  
  test('90° (π/2)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [0, 1]])).toBeCloseTo(Math.PI / 2);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[1, 1], [1, 7]])).toBeCloseTo(Math.PI / 2);
    expect(angleFromSegmentToSegment([[0, 0], [1, 1]], [[1, 0], [0, 1]])).toBeCloseTo(Math.PI / 2);
  });
  
  test('135° (3π/4)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [-1, 1]])).toBeCloseTo(3 * Math.PI / 4);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[1, 1], [0, 2]])).toBeCloseTo(3 * Math.PI / 4);
  });
  
  test('180° (π)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[2, 0], [0, 0]])).toBeCloseTo(Math.PI);
    expect(angleFromSegmentToSegment([[0, 0], [1, 1]], [[1, 2], [0, 1]])).toBeCloseTo(Math.PI);
  });
  
  test('225° (5π/4)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [-1, -1]])).toBeCloseTo(5 * Math.PI / 4);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[1, 2], [0, 1]])).toBeCloseTo(5 * Math.PI / 4);
  });
  
  test('270° (3π/2)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [0, -1]])).toBeCloseTo(3 * Math.PI / 2);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 2], [0, 1]])).toBeCloseTo(3 * Math.PI / 2);
  });
  
  test('315° (7π/4)', () => {
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[0, 0], [1, -1]])).toBeCloseTo(7 * Math.PI / 4);
    expect(angleFromSegmentToSegment([[0, 0], [1, 0]], [[2, 2], [3, 1]])).toBeCloseTo(7 * Math.PI / 4);
  });
});