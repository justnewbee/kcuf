import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  getSegmentMiddlePoint
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('getSegmentMiddlePoint(segment: Segment): Point', () => {
    test(() => {
      expect(getSegmentMiddlePoint([[0, 0], [3, 4]])).toEqual([1.5, 2]);
      expect(getSegmentMiddlePoint([[1, 1.5], [4, 5.5]])).toEqual([2.5, 3.5]);
    });
  });
});