import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  segmentIsEqualSlope
} from '../src';

describe('segmentIsEqualSlope(s1: Segment, s2: Segment): boolean', () => {
  test('with slope', () => {
    const S1: Segment = [[1, 2], [2, 7]];
    const S2: Segment = [[2, 7], [1, 2]];
    
    expect(segmentIsEqualSlope(S1, S1)).toBe(true);
    expect(segmentIsEqualSlope(S1, S2)).toBe(true);
    expect(segmentIsEqualSlope(S2, S1)).toBe(true);
  });
  
  test('with slope 0', () => {
    const S1: Segment = [[0, 0], [100, 0]];
    const S2: Segment = [[2, 2], [3, 2]];
    
    expect(segmentIsEqualSlope(S1, S1)).toBe(true);
    expect(segmentIsEqualSlope(S1, S2)).toBe(true);
    expect(segmentIsEqualSlope(S2, S1)).toBe(true);
  });
  
  test('with slope infinity', () => {
    const S1: Segment = [[0, 0], [0, 30]];
    const S2: Segment = [[2, 2], [2, 52]];
    
    expect(segmentIsEqualSlope(S1, S1)).toBe(true);
    expect(segmentIsEqualSlope(S1, S2)).toBe(true);
    expect(segmentIsEqualSlope(S2, S1)).toBe(true);
  });
});