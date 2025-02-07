import {
  describe,
  expect,
  test
} from 'vitest';

import {
  toStringHex
} from '../src';

import {
  INVALID_INPUTS,
  COLORS
} from './const';

describe('toStringHex', () => {
  test('invalid inputs will return self', () => {
    INVALID_INPUTS.forEach(v => expect(toStringHex(v)).toBe(v));
  });
  
  describe('predefined colors', () => {
    test('named → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.name)).toBe(v.hexStr)));
    test('rgb → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.rgbStr)).toBe(v.hexStr)));
    test('rgb% → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.rgbStrPercentage)).toBe(v.hexStr)));
    test('rgb-legacy → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.rgbStrLegacy)).toBe(v.hexStr)));
    test('rgb-legacy% → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.rgbStrLegacyPercentage)).toBe(v.hexStr)));
    test('hsl → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.hslStr)).toBe(v.hexStr)));
    test('hsl-legacy → hexStr', () => COLORS.forEach(v => expect(toStringHex(v.hslStrLegacy)).toBe(v.hexStr)));
  });
  
  describe('will normalize hex', () => {
    test('cannot normalize', () => {
      [
        '#123',
        '#1234',
        '#123456',
        '#112345',
        '#112234',
        '#11223345'
      ].forEach(v => expect(toStringHex(v)).toBe(v));
    });
    
    test('hex6 → hex3', () => {
      expect(toStringHex('#ffffff')).toBe('#fff');
      expect(toStringHex('#FF0000')).toBe('#f00');
      expect(toStringHex('#00FFff')).toBe('#0ff');
    });
    
    test('hex8 → hex4', () => {
      expect(toStringHex('#ffffff55')).toBe('#fff5');
      expect(toStringHex('#FF000077')).toBe('#f007');
      expect(toStringHex('#00FFff99')).toBe('#0ff9');
    });
    
    test('alpha ff will be omitted', () => {
      expect(toStringHex('#123f')).toBe('#123');
      expect(toStringHex('#ffffffff')).toBe('#fff');
      expect(toStringHex('#FF0000ff')).toBe('#f00');
      expect(toStringHex('#00FFffff')).toBe('#0ff');
    });
  });
});
