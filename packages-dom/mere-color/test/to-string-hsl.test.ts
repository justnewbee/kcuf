import {
  describe,
  expect,
  test
} from 'vitest';

import {
  toStringHsl
} from '../src';

import {
  INVALID_INPUTS,
  COLORS
} from './const';

describe('toStringHsl', () => {
  test('wrong inputs will return self', () => {
    INVALID_INPUTS.forEach(v => expect(toStringHsl(v)).toBe(v));
  });
  
  describe('predefined colors', () => {
    test('named → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.name)).toBe(v.hslStr)));
    test('rgb → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.rgbStr)).toBe(v.hslStr)));
    test('rgb% → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.rgbStrPercentage)).toBe(v.hslStr)));
    test('rgb-legacy → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.rgbStrLegacy)).toBe(v.hslStr)));
    test('rgb-legacy% → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.rgbStrLegacyPercentage)).toBe(v.hslStr)));
    test('hsl → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.hslStr)).toBe(v.hslStr)));
    test('hsl-legacy → hslStr', () => COLORS.forEach(v => expect(toStringHsl(v.hslStrLegacy)).toBe(v.hslStr)));
  });
  
  describe('will normalize rgb', () => {
    test('space normalized', () => {
      expect(toStringHsl('hsl(1  70% 60%)')).toBe('hsl(1 70% 60%)');
      expect(toStringHsl(' hsl(1  70% 60%)')).toBe('hsl(1 70% 60%)');
      expect(toStringHsl(' hsl(1  70%  60%) ')).toBe('hsl(1 70% 60%)');
    });
    
    test('rgb-legacy → rgb modern', () => {
      expect(toStringHsl('hsl(1, 70%, 60%)')).toBe('hsl(1 70% 60%)');
      expect(toStringHsl(' hsl(1, 70%,  60%)')).toBe('hsl(1 70% 60%)');
      expect(toStringHsl(' hsl(1,  70%,  60%)')).toBe('hsl(1 70% 60%)');
    });
  });
});
