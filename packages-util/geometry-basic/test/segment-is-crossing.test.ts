import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  segmentIsCrossing
} from '../src';

describe('segmentIsCrossing(s1: Segment, s2: Segment): boolean', () => {
  test('same → false', () => {
    const s: Segment = [[1, 2], [2, 7]];
    
    expect(segmentIsCrossing(s, s)).toBe(false);
  });
  
  test('along the same line → false', () => {
    expect(segmentIsCrossing([[1, 1], [2, 2]], [[4, 4], [2, 2]])).toBe(false);
    expect(segmentIsCrossing([[1, 1], [2, 2]], [[4, 4], [5, 5]])).toBe(false);
  });
  
  test('parallel → false', () => {
    expect(segmentIsCrossing([[1, 1], [2, 2]], [[1, 4], [2, 5]])).toBe(false);
  });
  
  test('no crossing → false', () => {
    expect(segmentIsCrossing([[1, 2], [2, 7]], [[4, 2], [2, 6]])).toBe(false);
    expect(segmentIsCrossing([[1, 2], [2, 7]], [[1, 1], [2, 6]])).toBe(false);
  });
  
  test('share one point → true', () => {
    expect(segmentIsCrossing([[1, 2], [2, 7]], [[1, 2], [2, 6]])).toBe(true);
    expect(segmentIsCrossing([[1, 2], [2, 7]], [[9, 100], [2, 7]])).toBe(true);
  });
  
  test('crossing', () => {
    expect(segmentIsCrossing([[1, 2], [2, 7]], [[1, 3], [2, 6]])).toBe(true);
  });
  
  test('bug fixed', () => {
    expect(segmentIsCrossing([
      [2689.7959, 2853.0612],
      [3346.9388, 2412.2449]
    ], [
      [2342.8571, 2551.0204],
      [3066.7723, 2600.1826]
    ])).toEqual(true);
  });
});