import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isOverlappingSegments
} from '../src';

describe('isOverlappingSegments(s1: Segment, s2: Segment): boolean', () => {
  test('overlapping', () => {
    // y = x
    expect(isOverlappingSegments([[0, 0], [2, 2]], [[1, 1], [3, 3]])).toBe(true);
    expect(isOverlappingSegments([[1, 1], [3, 3]], [[0, 0], [2, 2]])).toBe(true);
    // y = x / 2 + 1
    expect(isOverlappingSegments([[0, 1], [3, 2.5]], [[0.5, 1.25], [4, 3]])).toBe(true);
  });
  
  test('same line, but not overlapping', () => {
    // y = x
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[1, 1], [3, 3]])).toBe(false);
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[2, 2], [3, 3]])).toBe(false);
    // y = x / 2 + 1
    expect(isOverlappingSegments([[0, 1], [3, 2.5]], [[3, 2.5], [6, 4]])).toBe(false);
    expect(isOverlappingSegments([[0, 1], [3, 2.5]], [[4, 3], [6, 4]])).toBe(false);
  });
  
  test('different lines', () => {
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[0, 1], [3, 2.5]])).toBe(false);
  });
});
