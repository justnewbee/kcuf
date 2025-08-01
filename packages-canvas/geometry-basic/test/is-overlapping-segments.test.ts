import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isOverlappingSegments
} from '../src';

describe('isOverlappingSegments(s1: Segment, s2: Segment): boolean', () => {
  describe('overlapping', () => {
    test('full', () => {
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[1, 1], [3, 3]])).toBe(true); // 1/2-------1'/2'
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[3, 3], [1, 1]])).toBe(true); // 1/2'-------1'/2
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[3, 3], [1, 1]])).toBe(true); // 1'/2'-------1/2
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[1, 1], [3, 3]])).toBe(true); // 1'/2-------1/2'
    });
    test('in the middle', () => {
      expect(isOverlappingSegments([[0, 0], [2, 2]], [[1, 1], [3, 3]])).toBe(true); // 1------2---1'----2'
      expect(isOverlappingSegments([[0, 0], [2, 2]], [[3, 3], [1, 1]])).toBe(true); // 1------2'---1'----2
      expect(isOverlappingSegments([[2, 2], [0, 0]], [[3, 3], [1, 1]])).toBe(true); // 1'------2'---1----2
      expect(isOverlappingSegments([[2, 2], [0, 0]], [[1, 1], [3, 3]])).toBe(true); // 1'------2---1----2'
      // segment order revered
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[0, 0], [2, 2]])).toBe(true);
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[0, 0], [2, 2]])).toBe(true);
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[2, 2], [0, 0]])).toBe(true);
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[2, 2], [0, 0]])).toBe(true);
    });
    test('one end 1', () => {
      expect(isOverlappingSegments([[0, 0], [3, 3]], [[1, 1], [3, 3]])).toBe(true); // 1------2---1'/2'
      expect(isOverlappingSegments([[0, 0], [3, 3]], [[3, 3], [1, 1]])).toBe(true); // 1------2'---1'/2
      expect(isOverlappingSegments([[3, 3], [0, 0]], [[3, 3], [1, 1]])).toBe(true); // 1'------2'---1/2
      expect(isOverlappingSegments([[3, 3], [0, 0]], [[1, 1], [3, 3]])).toBe(true); // 1'------2---1/2'
      // segment order revered
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[0, 0], [3, 3]])).toBe(true);
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[0, 0], [3, 3]])).toBe(true);
      expect(isOverlappingSegments([[3, 3], [1, 1]], [[3, 3], [0, 0]])).toBe(true);
      expect(isOverlappingSegments([[1, 1], [3, 3]], [[3, 3], [0, 0]])).toBe(true);
    });
    test('one end 2', () => {
      expect(isOverlappingSegments([[0, 0], [3, 3]], [[0, 0], [7, 7]])).toBe(true); // 1/2------1'---/2'
      expect(isOverlappingSegments([[0, 0], [3, 3]], [[7, 7], [0, 0]])).toBe(true); // 1/2'------1'---/2
      expect(isOverlappingSegments([[3, 3], [0, 0]], [[7, 7], [0, 0]])).toBe(true); // 1'/2'------1---/2
      expect(isOverlappingSegments([[3, 3], [0, 0]], [[0, 0], [7, 7]])).toBe(true); // 1'/2------1---/2'
      // segment order revered
      expect(isOverlappingSegments([[0, 0], [7, 7]], [[0, 0], [3, 3]])).toBe(true);
      expect(isOverlappingSegments([[7, 7], [0, 0]], [[0, 0], [3, 3]])).toBe(true);
      expect(isOverlappingSegments([[7, 7], [0, 0]], [[3, 3], [0, 0]])).toBe(true);
      expect(isOverlappingSegments([[0, 0], [7, 7]], [[3, 3], [0, 0]])).toBe(true);
    });
    test('real data', () => {
      expect(isOverlappingSegments([[1175.0362839492273, 281.1961054844728], [2204.9948708816432, 282.2912534054948]], [[1690.0155774154352, 281.7436794449838], [2204.9948708816432, 282.2912534054948]])).toBe(true);
    });
  });
  describe('no overlapping', () => {
    test('same line - one same end', () => {
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[1, 1], [3, 3]])).toBe(false); // 1------1'/2--------2'
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[3, 3], [1, 1]])).toBe(false); // 1------1'/2'--------2
      expect(isOverlappingSegments([[1, 1], [0, 0]], [[3, 3], [1, 1]])).toBe(false); // 1'------1/2'--------2
      expect(isOverlappingSegments([[1, 1], [0, 0]], [[1, 1], [3, 3]])).toBe(false); // 1'------1/2--------2'
    });
    test('same line - apart', () => {
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[2, 2], [3, 3]])).toBe(false); // 1------1'---2--------2'
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[3, 3], [2, 2]])).toBe(false); // 1------1'---2'--------2
      expect(isOverlappingSegments([[1, 1], [0, 0]], [[3, 3], [2, 2]])).toBe(false); // 1'------1---2'--------2
      expect(isOverlappingSegments([[1, 1], [0, 0]], [[2, 2], [3, 3]])).toBe(false); // 1'------1---2--------2'
    });
    test('different lines', () => {
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[2, 2], [3, 5]])).toBe(false);
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[1, 1], [3, 2.5]])).toBe(false);
      expect(isOverlappingSegments([[0, 0], [1, 1]], [[0, 1], [3, 2.5]])).toBe(false);
    });
  });
});
