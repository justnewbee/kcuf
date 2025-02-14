import {
  describe,
  expect,
  test
} from 'vitest';

import {
  saturate
} from '../src';

describe('saturate', () => {
  test('should saturate a color by 10%', () => {
    expect(saturate('#444', 10)).toBe('#4b3d3d');
  });
  
  test('should saturate a hex color by 20%', () => {
    expect(saturate('#CCCD64', 20)).toBe('#e0e150');
  });
  
  test('should saturate an 8-digit hex color by 20%', () => {
    expect(saturate('#6564CDB3', 20)).toBe('#5150e1b3');
  });
  
  test('should saturate an 4-digit hex color by 20%', () => {
    expect(saturate('#0f08', 20)).toBe('#0f08');
  });
  
  test('should saturate a color with opacity by 20%', () => {
    expect(saturate('rgba(101,100,205,0.7)', 20)).toBe('rgb(81 80 225 / 70%)');
  });
  
  test('should saturate a color but not go beyond 255', () => {
    expect(saturate('rgba(255,200,200,0.7)', 80)).toBe('rgb(255 200 200 / 70%)');
  });
});
