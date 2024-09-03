import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathBbox
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('pathBbox(path: Path): [Point, Point]', () => {
    expect(pathBbox([[1, 1]])).toEqual([[1, 1], [1, 1]]);
    expect(pathBbox([[0, 1], [1, 0]])).toEqual([[0, 0], [1, 1]]);
    expect(pathBbox([[0, 1], [2, 0], [1, 3]])).toEqual([[0, 0], [2, 3]]);
  });
});