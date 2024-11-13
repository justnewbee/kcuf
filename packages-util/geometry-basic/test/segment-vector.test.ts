import {
  describe,
  expect,
  test
} from 'vitest';

import {
  segmentVector,
  segmentVectorNormalized,
  vectorMagnitude
} from '../src';

import {
  SQRT2
} from './const';

describe('segmentVector(segment: Segment): Vector', (): void => {
  test('平行 x 轴', () => {
    expect(segmentVector([[0, 0], [5, 0]])).toEqual([5, 0]);
    expect(segmentVector([[5, 0], [0, 0]])).toEqual([-5, 0]);
    expect(segmentVector([[2, 2], [100, 2]])).toEqual([98, 0]);
    expect(segmentVector([[100, 2], [2, 2]])).toEqual([-98, 0]);
  });

  test('平行 y 轴', () => {
    expect(segmentVector([[0, 0], [0, 7]])).toEqual([0, 7]);
    expect(segmentVector([[0, 7], [0, 0]])).toEqual([0, -7]);
    expect(segmentVector([[7, 2], [7, 100]])).toEqual([0, 98]);
    expect(segmentVector([[7, 100], [7, 2]])).toEqual([0, -98]);
  });
  
  test('普通线段', () => {
    expect(segmentVector([[1, 1], [7, 7]])).toEqual([6, 6]);
    expect(segmentVector([[7, 7], [1, 1]])).toEqual([-6, -6]);
    expect(segmentVector([[2, 2], [8, 8]])).toEqual([6, 6]);
    expect(segmentVector([[8, 8], [2, 2]])).toEqual([-6, -6]);
    expect(segmentVector([[2, 4], [8, 10]])).toEqual([6, 6]);
    expect(segmentVector([[8, 10], [2, 4]])).toEqual([-6, -6]);
  });
});

describe('segmentVectorNormalized(segment: Segment): Vector', (): void => {
  test('平行 x 轴', () => {
    expect(segmentVectorNormalized([[0, 0], [5, 0]])).toEqual([1, 0]);
    expect(segmentVectorNormalized([[5, 0], [0, 0]])).toEqual([-1, 0]);
    expect(segmentVectorNormalized([[2, 2], [100, 2]])).toEqual([1, 0]);
    expect(segmentVectorNormalized([[100, 2], [2, 2]])).toEqual([-1, 0]);
  });

  test('平行 y 轴', () => {
    expect(segmentVectorNormalized([[0, 0], [0, 7]])).toEqual([0, 1]);
    expect(segmentVectorNormalized([[0, 7], [0, 0]])).toEqual([0, -1]);
    expect(segmentVectorNormalized([[7, 2], [7, 100]])).toEqual([0, 1]);
    expect(segmentVectorNormalized([[7, 100], [7, 2]])).toEqual([0, -1]);
  });
  
  test('普通线段', () => {
    expect(segmentVectorNormalized([[1, 1], [7, 7]])[0]).toBeCloseTo(SQRT2 / 2);
    expect(segmentVectorNormalized([[7, 7], [1, 1]])[1]).toBeCloseTo(-SQRT2 / 2);
    expect(vectorMagnitude(segmentVectorNormalized([[7, 7], [1, 1]]))).toEqual(1);
    expect(vectorMagnitude(segmentVectorNormalized([[2, 2], [8, 8]]))).toEqual(1);
    expect(vectorMagnitude(segmentVectorNormalized([[8, 8], [2, 2]]))).toEqual(1);
    expect(vectorMagnitude(segmentVectorNormalized([[2, 4], [8, 10]]))).toEqual(1);
    expect(vectorMagnitude(segmentVectorNormalized([[8, 10], [2, 4]]))).toEqual(1);
  });
});
