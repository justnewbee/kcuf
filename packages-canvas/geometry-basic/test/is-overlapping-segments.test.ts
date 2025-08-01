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
    expect(isOverlappingSegments([[0, 0], [2, 2]], [[1, 1], [3, 3]])).toBe(true); // +------*---+----*
    expect(isOverlappingSegments([[0, 0], [2, 2]], [[-1, -1], [3, 3]])).toBe(true); // +------*---*----+
    expect(isOverlappingSegments([[1, 1], [3, 3]], [[1, 1], [3, 3]])).toBe(true); // *+-------+*
    expect(isOverlappingSegments([[1, 1], [3, 3]], [[3, 3], [1, 1]])).toBe(true); // *+-------+*
  });
  
  test('same line, but not overlapping', () => {
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[1, 1], [2, 2]])).toBe(false); // +-------+*----*
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[2, 2], [3, 3]])).toBe(false); // +-------+---*----*
  });
  
  test('different lines', () => {
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[1, 1], [3, 2.5]])).toBe(false);
    expect(isOverlappingSegments([[0, 0], [1, 1]], [[0, 1], [3, 2.5]])).toBe(false);
  });
});
