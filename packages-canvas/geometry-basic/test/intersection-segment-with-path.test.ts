import {
  describe,
  expect,
  test
} from 'vitest';

import {
  intersectionSegmentWithPath
} from '../src';

import {
  TEST_PATH_6_CONCAVE
} from './const';

const {
  path
} = TEST_PATH_6_CONCAVE;

describe('intersectionSegmentWithPath(segment: Segment, path: Path, options?): Point[]', () => {
  test('intersection x0', () => {
    expect(intersectionSegmentWithPath([[0, 3], [1, 4]], path)).toEqual([]);
  });
  
  test('intersection x1', () => {
    expect(intersectionSegmentWithPath([[4, 2], [5, 3]], path)).toEqual([[4, 2]]);
    expect(intersectionSegmentWithPath([[3, 1], [5, 3]], path)).toEqual([[4, 2]]);
  });
  
  test('intersection x2', () => {
    expect(intersectionSegmentWithPath([[1, 0], [4, 3]], path)).toEqual([[1, 0], [4, 3]]);
    expect(intersectionSegmentWithPath([[4, 3], [1, 0]], path)).toEqual([[4, 3], [1, 0]]);
    
    expect(intersectionSegmentWithPath([[0, -1], [5, 4]], path)).toEqual([[1, 0], [4, 3]]);
    expect(intersectionSegmentWithPath([[5, 4], [0, -1]], path)).toEqual([[4, 3], [1, 0]]);
  });
  
  test('intersection >2', () => {
    expect(intersectionSegmentWithPath([[-1, 0], [2, 3]], path)).toEqual([[-0, 1], [1, 2], [2, 3]]);
    expect(intersectionSegmentWithPath([[2, 3], [-1, 0]], path)).toEqual([[2, 3], [1, 2], [-0, 1]]);
    expect(intersectionSegmentWithPath([[-1, 0], [4, 5]], path)).toEqual([[-0, 1], [1, 2], [2, 3], [3, 4]]);
    expect(intersectionSegmentWithPath([[4, 5], [-1, 0]], path)).toEqual([[3, 4], [2, 3], [1, 2], [-0, 1]]);
  });
  
  test('extended', () => {
    expect(intersectionSegmentWithPath([[-1, 0], [2, 3]], path, true)).toEqual([[-0, 1], [1, 2], [2, 3], [3, 4]]);
    expect(intersectionSegmentWithPath([[2, 3], [-1, 0]], path, true)).toEqual([[3, 4], [2, 3], [1, 2], [-0, 1]]);
    expect(intersectionSegmentWithPath([[-1, 0], [4, 5]], path, true)).toEqual([[-0, 1], [1, 2], [2, 3], [3, 4]]);
    expect(intersectionSegmentWithPath([[4, 5], [-1, 0]], path, true)).toEqual([[3, 4], [2, 3], [1, 2], [-0, 1]]);
  });
});
