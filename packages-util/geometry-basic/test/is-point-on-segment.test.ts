import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  isPointOnSegment
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('isPointOnSegment(point: Point, segment: Segment): boolean', () => {
    expect(isPointOnSegment([2, 2], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(isPointOnSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(isPointOnSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(isPointOnSegment([3, 3], SEGMENT)).toBe(true);
  });
});