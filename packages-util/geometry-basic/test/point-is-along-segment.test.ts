import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Segment,
  pointIsAlongSegment
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const SEGMENT: Segment = [[1, 1], [4, 4]];
  
  test('pointIsAlongSegment(point: Point, segment: Segment): boolean', () => {
    expect(pointIsAlongSegment([2, 2], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.1, 2.1], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.7, 2.7], SEGMENT)).toBe(true);
    expect(pointIsAlongSegment([2.7, 2.75], SEGMENT)).toBe(false);
    expect(pointIsAlongSegment([2.7, 2.9], SEGMENT)).toBe(false);
    expect(pointIsAlongSegment([3, 3], SEGMENT)).toBe(true);
  });
});