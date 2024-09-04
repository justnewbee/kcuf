import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointDistance
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pointDistance(p1: Point, p2: Point): number', () => {
    expect(pointDistance([0, 0], [0, 0])).toEqual(0);
    expect(pointDistance([0, 0], [0, 1])).toEqual(1);
    expect(pointDistance([0, 0], [1, 0])).toEqual(1);
    expect(pointDistance([1, 0], [0, 1])).toEqual(Math.hypot(1, 1));
    expect(pointDistance([0, 0], [1, 1])).toEqual(Math.hypot(1, 1));
  });
});