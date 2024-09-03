import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  pointIsAlongPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH: Path = [[1, 1], [4, 1], [4, 4], [1, 3]];
  
  test('pointIsAlongPath(point: Point, path: Path): boolean', () => {
    expect(pointIsAlongPath([3, 3], PATH)).toBe(false);
    expect(pointIsAlongPath([1, 5], PATH)).toBe(false);
    expect(pointIsAlongPath([2, 1], PATH)).toBe(true);
  });
});