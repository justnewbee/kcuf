import {
  describe,
  expect,
  test
} from 'vitest';

import {
  a11yContrast
} from '../src';

import {
  COLORS,
  INVALID_INPUTS
} from './const';

describe('a11yContrast', () => {
  describe('predefined colors', () => {
    test('named', () => COLORS.forEach(v => expect(a11yContrast(v.name)).toEqual(v.contrast)));
    test('hex', () => COLORS.forEach(v => expect(a11yContrast(v.hexStr)).toEqual(v.contrast)));
    test('rgb', () => COLORS.forEach(v => expect(a11yContrast(v.rgbStr)).toEqual(v.contrast)));
    test('rgb%', () => COLORS.forEach(v => expect(a11yContrast(v.rgbStrPercentage)).toEqual(v.contrast)));
    test('rgb-legacy', () => COLORS.forEach(v => expect(a11yContrast(v.rgbStrLegacy)).toEqual(v.contrast)));
    test('rgb-legacy%', () => COLORS.forEach(v => expect(a11yContrast(v.rgbStrLegacyPercentage)).toEqual(v.contrast)));
    test('hsl', () => COLORS.forEach(v => expect(a11yContrast(v.hslStr)).toEqual(v.contrast)));
    test('hsl-legacy', () => COLORS.forEach(v => expect(a11yContrast(v.hslStrLegacy)).toEqual(v.contrast)));
  });
  
  test('invalid inputs → -1', () => {
    INVALID_INPUTS.forEach(v => expect(a11yContrast(v)).toBe(-1));
  });
  
  test('two hex colors', () => {
    expect(a11yContrast('#444', '#fff')).toEqual(9.722);
  });
  
  test('two 8-digit hex colors', () => {
    expect(a11yContrast('#6564CDB3', '#ffffff')).toEqual(4.93);
  });
  
  test('two 4-digit hex colors', () => {
    expect(a11yContrast('#0f08', '#000')).toEqual(15.3);
  });
  
  test('two rgba colors', () => {
    expect(a11yContrast('rgba(101,100,205,0.7)', 'rgba(0,0,0,1)')).toEqual(4.26);
  });
  
  test('two rgb colors', () => {
    expect(a11yContrast('rgb(204,205,100)', 'rgb(0,0,0)')).toEqual(12.48);
  });
  
  test('two hsla colors', () => {
    expect(a11yContrast('hsla(250, 100%, 50%, 0.2)', 'hsla(0, 100%, 100%, 1)')).toEqual(8.268);
  });
  
  test('two hsl colors', () => {
    expect(a11yContrast('hsl(0, 100%, 50%)', 'hsl(0, 100%, 100%)')).toEqual(3.992);
  });
  
  test('two named CSS colors', () => {
    expect(a11yContrast('papayawhip', 'white')).toEqual(1.131);
  });
  
  test('1 when used with a transparent color', () => {
    expect(a11yContrast('transparent', '#000')).toEqual(1);
  });
});
