import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  getSegmentProjectionX,
  getSegmentProjectionY
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const SEGMENT: Segment = [[1, 2], [5, 7]];
  const SEGMENT_VERTICAL: Segment = [[4, 2], [4, 7]];
  const SEGMENT_HORIZONTAL: Segment = [[5, 3], [15, 3]];
  
  test('getSegmentProjectionX(segment: Segment): [number, number]', () => {
    expect(getSegmentProjectionX(SEGMENT)).toEqual([1, 5]);
    expect(getSegmentProjectionX(SEGMENT_VERTICAL)).toEqual([4, 4]);
    expect(getSegmentProjectionX(SEGMENT_HORIZONTAL)).toEqual([5, 15]);
  });
  
  test('getSegmentProjectionY(segment: Segment): [number, number]', () => {
    expect(getSegmentProjectionY(SEGMENT)).toEqual([2, 7]);
    expect(getSegmentProjectionY(SEGMENT_VERTICAL)).toEqual([2, 7]);
    expect(getSegmentProjectionY(SEGMENT_HORIZONTAL)).toEqual([3, 3]);
  });
});