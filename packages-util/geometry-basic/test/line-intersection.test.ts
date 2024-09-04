import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  LineStandard,
  lineIntersection
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  describe('lineIntersection(line1: LineCoefficients, line2: LineCoefficients): Point', () => {
    const lineYex: LineStandard = [1, -1, 0]; // y = x
    
    test('same line', () => {
      expect(lineIntersection(lineYex, [1, -1, 0])).toBeNull();
      expect(lineIntersection(lineYex, [4, -4, 0])).toBeNull();
    });
    
    test('parallel lines', () => {
      expect(lineIntersection([1, -1, 7], [1, -1, 0])).toBeNull();
    });
    
    test('crossing lines', () => {
      // 垂直相交
      expect(lineIntersection(lineYex, [1, 1, -2])).toEqual([1, 1]);
      expect(lineIntersection(lineYex, [1, 1, -4])).toEqual([2, 2]);
      // y = x 与 x = 4
      expect(lineIntersection(lineYex, [1, 0, -4])).toEqual([4, 4]);
      // y = x 与 y = 7
      expect(lineIntersection(lineYex, [0, -1, 7])).toEqual([7, 7]);
      // y = 2x + 3 与 y = x + 4
      expect(lineIntersection([2, -1, 3], [1, -1, 4])).toEqual([1, 5]);
    });
  });
});