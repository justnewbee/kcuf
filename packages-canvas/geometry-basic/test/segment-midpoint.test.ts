import {
  describe,
  expect,
  test
} from 'vitest';

import {
  segmentMidpoint
} from '../src';

describe('segmentMidpoint(segment: Segment): Point', () => {
  test(() => {
    expect(segmentMidpoint([[0, 0], [3, 4]])).toEqual([1.5, 2]);
    expect(segmentMidpoint([[1, 1.5], [4, 5.5]])).toEqual([2.5, 3.5]);
  });
});
