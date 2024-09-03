import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  pointIsWithinPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH: Path = [[1, 1], [4, 1], [4, 4], [1, 3]];
  
  test('pointIsWithinPath(point: Point, path: Path): boolean', () => {
    expect(pointIsWithinPath([3, 3], PATH)).toBe(true);
    expect(pointIsWithinPath([1, 5], PATH)).toBe(false);
    expect(pointIsWithinPath([2, 1], PATH)).toBe(true); // 在边上
  });
});