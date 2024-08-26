import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  isPointOnPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH: Path = [[1, 1], [4, 1], [4, 4], [1, 3]];
  
  test('isPointOnPath(point: Point, path: Path): boolean', () => {
    expect(isPointOnPath([3, 3], PATH)).toBe(false);
    expect(isPointOnPath([1, 5], PATH)).toBe(false);
    expect(isPointOnPath([2, 1], PATH)).toBe(true);
  });
});