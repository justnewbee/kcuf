import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pointToPointDistance
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pointToPointDistance(p1: Point, p2: Point): number', () => {
    expect(pointToPointDistance([0, 0], [0, 0])).toEqual(0);
    expect(pointToPointDistance([0, 0], [0, 1])).toEqual(1);
    expect(pointToPointDistance([0, 0], [1, 0])).toEqual(1);
    expect(pointToPointDistance([1, 0], [0, 1])).toEqual(Math.hypot(1, 1));
    expect(pointToPointDistance([0, 0], [1, 1])).toEqual(Math.hypot(1, 1));
  });
});