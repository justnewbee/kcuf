import {
  describe,
  expect,
  test
} from 'vitest';

import {
  complement
} from '../src';

import {
  INVALID_INPUTS
} from './const';

describe('complement', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(complement(v)).toBe(v));
  });
  
  test('hex', () => {
    expect(complement('#448')).toBe('#884');
    expect(complement('#CCCD64')).toBe('#6564cd');
    expect(complement('#6564CDB3')).toBe('#cccd64b3');
    expect(complement('#00ff0088')).toBe('#f0f8');
  });
  
  test('rgb', () => {
    expect(complement('rgb(68 68 136)')).toBe('rgb(136 136 68)');
    expect(complement('rgb(204, 205,100)')).toBe('rgb(101 100 205)');
    expect(complement('rgb(101 100 205 / 0.7)')).toBe('rgb(204 205 100 / 70%)');
    expect(complement('rgb(101 100 205 / 70%)')).toBe('rgb(204 205 100 / 70%)');
    expect(complement('rgba(101,100,205,0.7)')).toBe('rgb(204 205 100 / 70%)');
    expect(complement('rgba(0,255,0,0.53)')).toBe('rgb(255 0 255 / 53%)');
  });
  
  test('hsl', () => {
    expect(complement('hsl(240,33%,40%)')).toBe('hsl(60 33% 40%)');
    expect(complement('hsl(61,51%,60%)')).toBe('hsl(241 51% 60%)');
    expect(complement('hsla(241,51%,60%,0.7)')).toBe('hsl(61 51% 60% / 70%)');
    expect(complement('hsla(120,100%,50%,0.53)')).toBe('hsl(300 100% 50% / 53%)');
  });
});
