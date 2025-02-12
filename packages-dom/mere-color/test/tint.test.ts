import {
  describe,
  expect,
  test
} from 'vitest';

import {
  tint
} from '../src';

describe('tint', () => {
  test('tint the provided color with white by the given percentage', () => {
    expect(tint('#00f', 25)).toEqual('#4040ff');
  });
  
  test('tint the provided 8-digit hex color with white by the given percentage', () => {
    expect(tint('#000fffcc', 25)).toEqual('#404bffd9');
  });
  
  test('tint the provided 4-digit hex color with white by the given percentage', () => {
    expect(tint('#0f08', 25)).toEqual('#40ff40a6');
  });
});
