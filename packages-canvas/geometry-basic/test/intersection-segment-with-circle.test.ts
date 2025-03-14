import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Circle,
  intersectionSegmentWithCircle
} from '../src';

describe('intersectionSegmentWithCircle(segment: Segment, circle: Circle): Point[]', () => {
  const circle: Circle = [[0, 0], 2];
  
  test('线段在圆内部', () => {
    expect(intersectionSegmentWithCircle([[0, 0], [0, 1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[0, 0], [0, -1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[1, 0], [1, -1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[-1, -1], [1, 1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[-1, -1], [1, -1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[-1, 1], [1, -1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[-1, 1], [-1, -1]], circle)).toEqual([]);
  });
  
  test('线段在圆外部', () => {
    expect(intersectionSegmentWithCircle([[3, 0], [3, 1]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[3, 0], [3, 4]], circle)).toEqual([]);
    expect(intersectionSegmentWithCircle([[2, 1], [3, 1]], circle)).toEqual([]);
  });
  
  test('线段一头透圆', () => {
    expect(intersectionSegmentWithCircle([[0, 0], [0, 3]], circle)).toEqual([[-0, 2]]);
    expect(intersectionSegmentWithCircle([[0, 0], [0, -3]], circle)).toEqual([[0, -2]]);
    expect(intersectionSegmentWithCircle([[0, 0], [3, 0]], circle)).toEqual([[2, 0]]);
    expect(intersectionSegmentWithCircle([[0, 0], [-3, 0]], circle)).toEqual([[-2, 0]]);
    expect(intersectionSegmentWithCircle([[1, 1], [2, 2]], circle)).toEqual([[Math.sqrt(2), Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[0, 0], [-2, 2]], circle)).toEqual([[-Math.sqrt(2), Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[0, 0], [-2, -2]], circle)).toEqual([[-Math.sqrt(2), -Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[0, 0], [2, -2]], circle)).toEqual([[Math.sqrt(2), -Math.sqrt(2)]]);
    
    expect(intersectionSegmentWithCircle([[2, 0], [2, 3]], circle)).toEqual([[2, 0]]);
    expect(intersectionSegmentWithCircle([[2, 0], [3, 3]], circle)).toEqual([[2, 0]]);
    expect(intersectionSegmentWithCircle([[2, 0], [1, 1]], circle)).toEqual([[2, 0]]);
    expect(intersectionSegmentWithCircle([[2, 0], [-1, -1]], circle)).toEqual([[2, 0]]);
  });
  
  test('线段两头透圆', () => {
    expect(intersectionSegmentWithCircle([[-2, -2], [2, 2]], circle)).toEqual([[-Math.sqrt(2), -Math.sqrt(2)], [Math.sqrt(2), Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[2, 2], [-2, -2]], circle)).toEqual([[Math.sqrt(2), Math.sqrt(2)], [-Math.sqrt(2), -Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[-2, 2], [2, -2]], circle)).toEqual([[-Math.sqrt(2), Math.sqrt(2)], [Math.sqrt(2), -Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[2, -2], [-2, 2]], circle)).toEqual([[Math.sqrt(2), -Math.sqrt(2)], [-Math.sqrt(2), Math.sqrt(2)]]);
    expect(intersectionSegmentWithCircle([[0, 3], [0, -3]], circle)).toEqual([[0, 2], [0, -2]]);
    expect(intersectionSegmentWithCircle([[0, -3], [0, 3]], circle)).toEqual([[0, -2], [0, 2]]);
    expect(intersectionSegmentWithCircle([[-3, 0], [3, 0]], circle)).toEqual([[-2, 0], [2, 0]]);
    expect(intersectionSegmentWithCircle([[3, 0], [-3, 0]], circle)).toEqual([[2, 0], [-2, 0]]);
    
    expect(intersectionSegmentWithCircle([[0, 2], [0, -2]], circle)).toEqual([[0, 2], [0, -2]]);
    expect(intersectionSegmentWithCircle([[0, -2], [0, 2]], circle)).toEqual([[0, -2], [0, 2]]);
    expect(intersectionSegmentWithCircle([[-2, 0], [2, 0]], circle)).toEqual([[-2, 0], [2, 0]]);
    expect(intersectionSegmentWithCircle([[2, 0], [-2, 0]], circle)).toEqual([[2, 0], [-2, 0]]);
  });
});
