import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  sliceSegmentEqually
} from '../src';

describe('sliceSegmentEqually', () => {
  test('n < 2, will not slice', () => {
    const segment: Segment = [[0, 0], [0, 1]];
    
    expect(sliceSegmentEqually(segment, 0)).toEqual([segment]);
    expect(sliceSegmentEqually(segment, 1)).toEqual([segment]);
  });
  
  test('will slice equally', () => {
    expect(sliceSegmentEqually([[0, 0], [0, 4]], 2)).toEqual([
      [[0, 0], [0, 2]],
      [[0, 2], [0, 4]]
    ]);
    expect(sliceSegmentEqually([[0, 0], [0, 4]], 4)).toEqual([
      [[0, 0], [0, 1]],
      [[0, 1], [0, 2]],
      [[0, 2], [0, 3]],
      [[0, 3], [0, 4]]
    ]);
    expect(sliceSegmentEqually([[0, 0], [4, 4]], 2)).toEqual([
      [[0, 0], [2, 2]],
      [[2, 2], [4, 4]]
    ]);
    expect(sliceSegmentEqually([[0, 0], [-4, 4]], 2)).toEqual([
      [[0, 0], [-2, 2]],
      [[-2, 2], [-4, 4]]
    ]);
  });
});
