import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  isEqualSegments
} from '../src';

describe('isEqualSegments(s1: Segment, s2: Segment): boolean', () => {
  const S1: Segment = [[1, 2], [2, 7]];
  const S2: Segment = [[2, 7], [1, 2]];
  const S3: Segment = [[4, 7], [14, 8]];
  
  test('same regardless of order', () => {
    expect(isEqualSegments(S1, S1)).toBe(true);
    expect(isEqualSegments(S1, S2)).toBe(true);
    expect(isEqualSegments(S2, S1)).toBe(true);
  });
  
  test('not same', () => {
    expect(isEqualSegments(S1, S3)).toBe(false);
    expect(isEqualSegments(S2, S3)).toBe(false);
  });
});
