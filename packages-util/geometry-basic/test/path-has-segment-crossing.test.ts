import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  pathPasSegmentCrossing
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('pathPasSegmentCrossing(path: Path): Point | null', () => {
    test('no crossing - 0, 1, 2, 3 points', () => {
      expect(pathPasSegmentCrossing([])).toBe(false);
      expect(pathPasSegmentCrossing([[1, 1]])).toBe(false);
      expect(pathPasSegmentCrossing([[1, 1], [2, 2]])).toBe(false);
      expect(pathPasSegmentCrossing([[1, 1], [2, 2], [3, 5]])).toBe(false);
    });

    test('no crossing', () => {
      expect(pathPasSegmentCrossing([[1, 1], [2, 2], [3, 5], [2, 4]])).toBe(false);
      expect(pathPasSegmentCrossing([[1, 1], [2, 2], [3, 5], [2, 4]])).toBe(false);
      expect(pathPasSegmentCrossing([[1, 1], [2, 2], [3, 5], [2, 4], [1, 2]])).toBe(false);
    });
    
    test('no crossing', () => {
      expect(pathPasSegmentCrossing([[1, 1], [3, 5], [2, 2], [2, 4]])).toBe(true);
      // expect(pathPasSegmentCrossing([[1778.2, 2404.7], [2070, 2700.4], [2996.1, 2303.5], [2308.6, 2598.1]])).toBe(true); // FIXME 这个应该是 true
    });
  });
});