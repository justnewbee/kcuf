import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  segmentIsEqual
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const S1: Segment = [[1, 2], [2, 7]];
  const S2: Segment = [[2, 7], [1, 2]];
  const S3: Segment = [[4, 7], [14, 8]];
  
  describe('segmentIsEqual(s1: Segment, s2: Segment): boolean', () => {
    test('same regardless of order', () => {
      expect(segmentIsEqual(S1, S1)).toBe(true);
      expect(segmentIsEqual(S1, S2)).toBe(true);
      expect(segmentIsEqual(S2, S1)).toBe(true);
    });
    
    test('not same', () => {
      expect(segmentIsEqual(S1, S3)).toBe(false);
      expect(segmentIsEqual(S2, S3)).toBe(false);
    });
  });
});