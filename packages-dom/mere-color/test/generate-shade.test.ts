import {
  describe,
  expect,
  test
} from 'vitest';

import {
  shade
} from '../src';

describe('shade', () => {
  test('shade the provided color with white by the given percentage', () => {
    expect(shade('#00f', 25)).toBe('#0000bf');
  });
  
  test('shade the provided 8-digit hex color with white by the given percentage', () => {
    expect(shade('#000fffcc', 25)).toBe('#000bbfd9');
  });
  
  test('shade the provided 4-digit hex color with white by the given percentage', () => {
    expect(shade('#0f08', 25)).toBe('#00bf00a6');
  });
});
