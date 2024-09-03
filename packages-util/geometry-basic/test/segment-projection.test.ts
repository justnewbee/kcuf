import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  segmentProjectionX,
  segmentProjectionY
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const SEGMENT: Segment = [[1, 2], [5, 7]];
  const SEGMENT_VERTICAL: Segment = [[4, 2], [4, 7]];
  const SEGMENT_HORIZONTAL: Segment = [[5, 3], [15, 3]];
  
  test('segmentProjectionX(segment: Segment): [number, number]', () => {
    expect(segmentProjectionX(SEGMENT)).toEqual([1, 5]);
    expect(segmentProjectionX(SEGMENT_VERTICAL)).toEqual([4, 4]);
    expect(segmentProjectionX(SEGMENT_HORIZONTAL)).toEqual([5, 15]);
  });
  
  test('segmentProjectionY(segment: Segment): [number, number]', () => {
    expect(segmentProjectionY(SEGMENT)).toEqual([2, 7]);
    expect(segmentProjectionY(SEGMENT_VERTICAL)).toEqual([2, 7]);
    expect(segmentProjectionY(SEGMENT_HORIZONTAL)).toEqual([3, 3]);
  });
});