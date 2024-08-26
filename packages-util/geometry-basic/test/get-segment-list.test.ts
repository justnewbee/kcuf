import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  Path,
  getSegmentList
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const PATH_0: Path = [];
  const PATH_1: Path = [[1, 2]];
  const PATH_2: Path = [[1, 2], [2, 5]];
  const PATH_3: Path = [[1, 2], [2, 5], [3, 10]];
  const PATH_4: Path = [[1, 2], [2, 5], [3, 10], [4, 17]];
  
  describe('getSegmentList(path: Path): Segment[]', () => {
    test('Path with 0-1 points has segment list of size 0', () => {
      expect(getSegmentList(PATH_0)).toEqual([]);
      expect(getSegmentList(PATH_1)).toEqual([]);
    });
    
    test('Path with 2 points has segment list of size 1', () => {
      expect(getSegmentList(PATH_2)).toEqual([[[1, 2], [2, 5]]]);
    });
    
    test('Path with n (3+) points has segment list of size n', () => {
      expect(getSegmentList(PATH_3)).toEqual([[[1, 2], [2, 5]], [[2, 5], [3, 10]], [[3, 10], [1, 2]]]);
      expect(getSegmentList(PATH_4)).toEqual([[[1, 2], [2, 5]], [[2, 5], [3, 10]], [[3, 10], [4, 17]], [[4, 17], [1, 2]]]);
    });
  });
});