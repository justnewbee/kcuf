import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  isPointInPath
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH: Path = [[1, 1], [4, 1], [4, 4], [1, 3]];
  
  test('isPointInPath(point: Point, path: Path): boolean', () => {
    expect(isPointInPath([3, 3], PATH)).toBe(true);
    expect(isPointInPath([1, 5], PATH)).toBe(false);
    expect(isPointInPath([2, 1], PATH)).toBe(true); // 在边上
  });
});