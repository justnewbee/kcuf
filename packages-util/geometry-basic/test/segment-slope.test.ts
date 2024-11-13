import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentSlope
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('segmentSlope(segment: Segment): number', () => {
    expect(segmentSlope([[1, 1], [2, 2]])).toEqual(1);
    expect(segmentSlope([[2, 2], [1, 1]])).toEqual(1);
    expect(segmentSlope([[0, 1], [1, 0]])).toEqual(-1);
    expect(segmentSlope([[1, 0], [0, 1]])).toEqual(-1);
    expect(segmentSlope([[1, 1], [2, 4]])).toEqual(3);
    expect(segmentSlope([[2, 4], [1, 1]])).toEqual(3);
  });
});
