import {
  describe,
  expect,
  test
} from 'vitest';

import {
  angleBetweenSegmentAndAxisY
} from '../src';

describe('angleBetweenSegmentAndAxisY(segment: Segment): number', () => {
  test('±0°', () => {
    expect(angleBetweenSegmentAndAxisY([[7, 1], [7, 107]])).toEqual(-0);
    expect(angleBetweenSegmentAndAxisY([[7, 107], [7, 1]])).toEqual(0);
  });
  
  test('±45°', () => {
    expect(angleBetweenSegmentAndAxisY([[1, 1], [15, 15]])).toEqual(-Math.PI / 4);
    expect(angleBetweenSegmentAndAxisY([[15, 15], [1, 1]])).toEqual(-Math.PI / 4);
    expect(angleBetweenSegmentAndAxisY([[0, 1], [1, 0]])).toEqual(Math.PI / 4);
    expect(angleBetweenSegmentAndAxisY([[1, 17], [17, 1]])).toEqual(Math.PI / 4);
  });
  
  test('+90°', () => {
    expect(angleBetweenSegmentAndAxisY([[5, 7], [2, 7]])).toEqual(Math.PI / 2);
    expect(angleBetweenSegmentAndAxisY([[2, 7], [5, 7]])).toEqual(Math.PI / 2);
  });
});