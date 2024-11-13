import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Path,
  translatePath
} from '../src';

describe('translatePath(path: Path, dxy: [number, number]): Path', () => {
  const PATH: Path = [[1, 3], [4, 7], [10, 2]];
  
  test('will not mutate', () => {
    expect(translatePath(PATH, [0, 0])).toEqual(PATH);
    expect(translatePath(PATH, [0, 0]) === PATH).toBe(false);
  });
  
  test('will translate right', () => {
    expect(translatePath(PATH, [1, 1])).toEqual([[2, 4], [5, 8], [11, 3]]);
    expect(translatePath(PATH, [0, 1])).toEqual([[1, 4], [4, 8], [10, 3]]);
    expect(translatePath(PATH, [-1, 1])).toEqual([[0, 4], [3, 8], [9, 3]]);
    expect(translatePath(PATH, [-1, -1])).toEqual([[0, 2], [3, 6], [9, 1]]);
  });
});
