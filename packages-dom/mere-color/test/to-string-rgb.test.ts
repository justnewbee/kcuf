import {
  describe,
  expect,
  test
} from 'vitest';

import {
  toStringRgb
} from '../src';

import {
  INVALID_INPUTS,
  COLORS
} from './const';

describe('toStringRgb', () => {
  test('wrong inputs will return self', () => {
    INVALID_INPUTS.forEach(v => expect(toStringRgb(v)).toBe(v));
  });
  
  describe('predefined colors', () => {
    test('named → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.name)).toBe(v.rgbStr)));
    test('rgb → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.rgbStr)).toBe(v.rgbStr)));
    test('rgb% → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.rgbStrPercentage)).toBe(v.rgbStr)));
    test('rgb-legacy → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.rgbStrLegacy)).toBe(v.rgbStr)));
    test('rgb-legacy% → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.rgbStrLegacyPercentage)).toBe(v.rgbStr)));
    test('hsl → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.hslStr)).toBe(v.rgbStr)));
    test('hsl-legacy → rgbStr', () => COLORS.forEach(v => expect(toStringRgb(v.hslStrLegacy)).toBe(v.rgbStr)));
  });
  
  describe('will normalize rgb', () => {
    test('space normalized', () => {
      expect(toStringRgb('rgb(1  2 3)')).toBe('rgb(1 2 3)');
      expect(toStringRgb(' rgb(1  2 3)')).toBe('rgb(1 2 3)');
      expect(toStringRgb(' rgb(1  2  3) ')).toBe('rgb(1 2 3)');
    });
    
    test('rgb-legacy → rgb modern', () => {
      expect(toStringRgb('rgb(1, 2, 3)')).toBe('rgb(1 2 3)');
      expect(toStringRgb(' rgb(1, 2,  3)')).toBe('rgb(1 2 3)');
      expect(toStringRgb(' rgb(1,  2,  3)')).toBe('rgb(1 2 3)');
    });
  });
});
