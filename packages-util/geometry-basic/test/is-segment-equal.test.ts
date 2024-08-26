import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  isSegmentEqual
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const S1: Segment = [[1, 2], [2, 7]];
  const S2: Segment = [[2, 7], [1, 2]];
  const S3: Segment = [[4, 7], [14, 8]];
  
  test('isSegmentEqual(p1: Segment, p2: Segment): boolean', () => {
    expect(isSegmentEqual(S1, S1)).toBe(true);
    expect(isSegmentEqual(S1, S2)).toBe(true);
    expect(isSegmentEqual(S2, S1)).toBe(true);
    expect(isSegmentEqual(S1, S3)).toBe(false);
    expect(isSegmentEqual(S2, S3)).toBe(false);
  });
});