import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Segment,
  sliceSegmentByRadius
} from '../src';

describe('sliceSegmentByRadius', () => {
  const segment: Segment = [[0, 0], [4, 4]];
  
  test('radius 0', () => {
    expect(sliceSegmentByRadius(segment, 0)).toEqual([segment]);
    expect(sliceSegmentByRadius(segment, 0, true)).toEqual([segment]);
  });
  
  test('radius good', () => {
    expect(sliceSegmentByRadius(segment, 1)).toEqual([
      [[0, 0], [Math.sqrt(2) / 2, Math.sqrt(2) / 2]],
      [[Math.sqrt(2) / 2, Math.sqrt(2) / 2], [4, 4]]
    ]);
    expect(sliceSegmentByRadius(segment, 1, true)).toEqual([
      [[0, 0], [4 - Math.sqrt(2) / 2, 4 - Math.sqrt(2) / 2]],
      [[4 - Math.sqrt(2) / 2, 4 - Math.sqrt(2) / 2], [4, 4]]
    ]);
    
    expect(sliceSegmentByRadius(segment, Math.sqrt(2))).toEqual([
      [[0, 0], [1, 1]],
      [[1, 1], [4, 4]]
    ]);
    expect(sliceSegmentByRadius(segment, Math.sqrt(2), true)).toEqual([
      [[0, 0], [3, 3]],
      [[3, 3], [4, 4]]
    ]);
  });
  
  test('radius too large', () => {
    expect(sliceSegmentByRadius(segment, 16)).toEqual([segment]);
    expect(sliceSegmentByRadius(segment, 16, true)).toEqual([segment]);
  });
});
