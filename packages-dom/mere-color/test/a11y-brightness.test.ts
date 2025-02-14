import {
  describe,
  expect,
  test
} from 'vitest';

import {
  a11yBrightness
} from '../src';

import {
  COLORS,
  INVALID_INPUTS
} from './const';

describe('a11yBrightness', () => {
  describe('predefined colors', () => {
    test('named', () => COLORS.forEach(v => expect(a11yBrightness(v.name)).toEqual(v.brightness)));
    test('hex', () => COLORS.forEach(v => expect(a11yBrightness(v.hexStr)).toEqual(v.brightness)));
    test('rgb', () => COLORS.forEach(v => expect(a11yBrightness(v.rgbStr)).toEqual(v.brightness)));
    test('rgb%', () => COLORS.forEach(v => expect(a11yBrightness(v.rgbStrPercentage)).toEqual(v.brightness)));
    test('rgb-legacy', () => COLORS.forEach(v => expect(a11yBrightness(v.rgbStrLegacy)).toEqual(v.brightness)));
    test('rgb-legacy%', () => COLORS.forEach(v => expect(a11yBrightness(v.rgbStrLegacyPercentage)).toEqual(v.brightness)));
    test('hsl', () => COLORS.forEach(v => expect(a11yBrightness(v.hslStr)).toEqual(v.brightness)));
    test('hsl-legacy', () => COLORS.forEach(v => expect(a11yBrightness(v.hslStrLegacy)).toEqual(v.brightness)));
  });
  
  test('invalid inputs → -1', () => {
    INVALID_INPUTS.forEach(v => expect(a11yBrightness(v)).toBe(-1));
  });
  
  test('rgba color', () => {
    expect(a11yBrightness('rgba(101 100 205 / 0.7)')).toEqual(112.269);
    expect(a11yBrightness('rgba(101 100 205 / 70%)')).toEqual(112.269);
    expect(a11yBrightness('rgba(101,100,205,0.7)')).toEqual(112.269);
  });
  
  test('hlsa color', () => {
    expect(a11yBrightness('hsla(250 100% 50% / 0.2)')).toEqual(41.628);
    expect(a11yBrightness('hsla(250 100% 50% / 20%)')).toEqual(41.628);
    expect(a11yBrightness('hsla(250, 100%, 50%, 0.2)')).toEqual(41.628);
  });
  
  test('transparent → 0', () => {
    expect(a11yBrightness('transparent')).toEqual(0);
    expect(a11yBrightness('#0000')).toEqual(0);
  });
});
