import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  segmentVector
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('segmentVector(segment: Segment): Vector', () => {
    expect(segmentVector([[1, 2], [1, 2]])).toEqual([0, 0]);
    expect(segmentVector([[1, 2], [5, 7]])).toEqual([4, 5]);
    expect(segmentVector([[5, 7], [1, 2]])).toEqual([-4, -5]);
  });
});