import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Point,
  isPointEqual
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const P1: Point = [1, 2];
  const P2: Point = [4, 7];
  
  test('isPointEqual(p1: Point, p2: Point): boolean', () => {
    expect(isPointEqual(P1, P1)).toBe(true);
    expect(isPointEqual(P1, P2)).toBe(false);
  });
});