import {
  describe,
  expect,
  test
} from 'vitest';

import {
  lighten
} from '../src';

describe('lighten', () => {
  test('lighten a color by 10%', () => {
    expect(lighten('#444', 10)).toBe('#5e5e5e');
  });
  
  test('lighten a hex color by 20%', () => {
    expect(lighten('#CCCD64', 20)).toBe('#e5e6b1');
  });
  
  test('lighten an 8-digit hex color by 20%', () => {
    expect(lighten('#6564CDB3', 20)).toBe('#b2b1e6b3');
  });
  
  test('lighten an 4-digit hex color by 20%', () => {
    expect(lighten('#0f08', 20)).toBe('#6f68');
  });
  
  test('lighten a color with opacity by 20%', () => {
    expect(lighten('rgba(101,100,205,0.7)', 20)).toBe('rgb(178 177 230 / 70%)');
  });
  
  test('lighten a color but not go beyond 255', () => {
    expect(lighten('rgba(255,200,200,0.7)', 20)).toBe('rgb(255 255 255 / 70%)');
  });
});
