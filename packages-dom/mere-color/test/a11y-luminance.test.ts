import {
  describe,
  expect,
  test
} from 'vitest';

import {
  a11yLuminance
} from '../src';

import {
  COLORS,
  INVALID_INPUTS
} from './const';

describe('a11yLuminance', () => {
  describe('predefined colors', () => {
    test('named', () => COLORS.forEach(v => expect(a11yLuminance(v.name)).toEqual(v.luminance)));
    test('hex', () => COLORS.forEach(v => expect(a11yLuminance(v.hexStr)).toEqual(v.luminance)));
    test('rgb', () => COLORS.forEach(v => expect(a11yLuminance(v.rgbStr)).toEqual(v.luminance)));
    test('rgb%', () => COLORS.forEach(v => expect(a11yLuminance(v.rgbStrPercentage)).toEqual(v.luminance)));
    test('rgb-legacy', () => COLORS.forEach(v => expect(a11yLuminance(v.rgbStrLegacy)).toEqual(v.luminance)));
    test('rgb-legacy%', () => COLORS.forEach(v => expect(a11yLuminance(v.rgbStrLegacyPercentage)).toEqual(v.luminance)));
    test('hsl', () => COLORS.forEach(v => expect(a11yLuminance(v.hslStr)).toEqual(v.luminance)));
    test('hsl-legacy', () => COLORS.forEach(v => expect(a11yLuminance(v.hslStrLegacy)).toEqual(v.luminance)));
  });
  
  test('invalid inputs → -1', () => {
    INVALID_INPUTS.forEach(v => expect(a11yLuminance(v)).toBe(-1));
  });
  
  test('rgba color', () => {
    expect(a11yLuminance('rgba(101 100 205 / 0.7)')).toEqual(0.163);
    expect(a11yLuminance('rgba(101 100 205 / 70%)')).toEqual(0.163);
    expect(a11yLuminance('rgba(101,100,205,0.7)')).toEqual(0.163);
  });
  
  test('hlsa color', () => {
    expect(a11yLuminance('hsla(250 100% 50% / 0.2)')).toEqual(0.077);
    expect(a11yLuminance('hsla(250 100% 50% / 20%)')).toEqual(0.077);
    expect(a11yLuminance('hsla(250, 100%, 50%, 0.2)')).toEqual(0.077);
  });
  
  test('transparent → 0', () => {
    expect(a11yLuminance('transparent')).toEqual(0);
    expect(a11yLuminance('#0000')).toEqual(0);
  });
});
