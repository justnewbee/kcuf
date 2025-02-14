import {
  describe,
  expect,
  test
} from 'vitest';

import {
  desaturate
} from '../src';

describe('desaturate', () => {
  test('should desaturate a reduced hex color by 10%', () => {
    expect(desaturate('#444', 10)).toBe('#444');
  });
  
  test('should desaturate a hex color by 20%', () => {
    expect(desaturate('#CCCD64', 20)).toBe('#b8b879');
  });
  
  test('should desaturate an 8-digit hex color by 20%', () => {
    expect(desaturate('#6564CDB3', 20)).toBe('#7979b8b3');
  });
  
  test('should desaturate an 4-digit hex color by 20%', () => {
    expect(desaturate('#0f08', 20)).toBe('#1ae61a88');
  });
  
  test('should desaturate a color with opacity by 20%', () => {
    expect(desaturate('rgba(101,100,205,0.7)', 20)).toBe('rgb(121 121 184 / 70%)');
  });
  
  test('should desaturate a color but not go below 0', () => {
    expect(desaturate('rgba(40,20,10,0.7)', 80)).toBe('rgb(25 25 25 / 70%)');
  });
  
  test('should return transparent when passed transparent', () => {
    expect(desaturate('transparent', 80)).toBe('#0000');
  });
});
