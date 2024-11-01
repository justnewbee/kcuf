import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  translateSegment
} from '../src';

describe('translateSegment(point: Segment, dxy: [number, number]): Segment', () => {
  const S: Segment = [[1, 3], [4, 7]];
  
  test('will not mutate', () => {
    expect(translateSegment(S, [0, 0])).toEqual(S);
    expect(translateSegment(S, [0, 0]) === S).toBe(false);
  });
  
  test('will translate right', () => {
    expect(translateSegment(S, [1, 1])).toEqual([[2, 4], [5, 8]]);
    expect(translateSegment(S, [0, 1])).toEqual([[1, 4], [4, 8]]);
    expect(translateSegment(S, [-1, 1])).toEqual([[0, 4], [3, 8]]);
    expect(translateSegment(S, [-1, -1])).toEqual([[0, 2], [3, 6]]);
  });
});