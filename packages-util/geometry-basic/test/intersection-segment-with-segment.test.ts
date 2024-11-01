import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  intersectionSegmentWithSegment
} from '../src';

describe('intersectionSegmentWithSegment(segment1: Segment, segment2: Segment): Point | null', () => {
  test('segments same → null', () => {
    const s1: Segment = [[1, 2], [2, 7]];
    
    expect(intersectionSegmentWithSegment(s1, s1)).toBeNull();
  });
  
  test('segments along the same line → null', () => {
    const s1: Segment = [[0, 0], [2, 1]];
    const s2: Segment = [[4, 2], [10, 5]];
    
    expect(intersectionSegmentWithSegment(s1, s2)).toBeNull();
  });
  
  test('segments parallel → null', () => {
    const s1: Segment = [[0, 0], [2, 1]];
    const s2: Segment = [[1, 1], [3, 2]];
    
    expect(intersectionSegmentWithSegment(s1, s2)).toBeNull();
  });
  
  test('segments with point joint', () => {
    const s1: Segment = [[1, 7], [9, 2]];
    const s2: Segment = [[9, 2], [100, 2]];
    
    expect(intersectionSegmentWithSegment(s1, s2)).toEqual([9, 2]);
  });
  
  test('segments with no connection', () => {
    const s1: Segment = [[1, 1], [4, 2]];
    const s2: Segment = [[2, 3], [4, 4]];
    
    expect(intersectionSegmentWithSegment(s1, s2)).toBeNull();
  });
  
  test('segments with connection', () => {
    const s1: Segment = [[1, 1], [4, 4]];
    const s2: Segment = [[1, 3], [3, 1]];
    
    expect(intersectionSegmentWithSegment(s1, s2)).toEqual([2, 2]);
  });
});