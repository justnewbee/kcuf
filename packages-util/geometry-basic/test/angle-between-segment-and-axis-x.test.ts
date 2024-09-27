import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleBetweenSegmentAndAxisX
} from '../src';

describe('angleBetweenSegmentAndAxisX(segment: Segment): number', () => {
  test('±0°', () => {
    expect(angleBetweenSegmentAndAxisX([[2, 7], [5, 7]])).toEqual(0);
    expect(angleBetweenSegmentAndAxisX([[5, 7], [2, 7]])).toEqual(-0);
  });
  
  test('±45°', () => {
    expect(angleBetweenSegmentAndAxisX([[1, 1], [15, 15]])).toEqual(Math.PI / 4);
    expect(angleBetweenSegmentAndAxisX([[15, 15], [1, 1]])).toEqual(Math.PI / 4);
    expect(angleBetweenSegmentAndAxisX([[0, 1], [1, 0]])).toEqual(-Math.PI / 4);
    expect(angleBetweenSegmentAndAxisX([[1, 0], [0, 1]])).toEqual(-Math.PI / 4);
    expect(angleBetweenSegmentAndAxisX([[1, 17], [17, 1]])).toEqual(-Math.PI / 4);
    expect(angleBetweenSegmentAndAxisX([[17, 1], [1, 17]])).toEqual(-Math.PI / 4);
  });
  
  test('+90°', () => {
    expect(angleBetweenSegmentAndAxisX([[7, 1], [7, 107]])).toEqual(Math.PI / 2);
    expect(angleBetweenSegmentAndAxisX([[7, 107], [7, 1]])).toEqual(Math.PI / 2);
  });
});