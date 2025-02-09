import {
  describe,
  expect,
  test
} from 'vitest';

import {
  Hsl,
  parseToHsl
} from '../src';

import {
  INVALID_INPUTS,
  COLORS
} from './const';

describe('parseToHsl', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(parseToHsl(v)).toBeNull());
  });
  
  describe('predefined colors', () => {
    test('named', () => COLORS.forEach(v => expect(parseToHsl(v.name)).toEqual(v.hsl)));
    test('hex', () => COLORS.forEach(v => expect(parseToHsl(v.hexStr)).toEqual(v.hsl)));
    test('rgb', () => COLORS.forEach(v => expect(parseToHsl(v.rgbStr)).toEqual(v.hsl)));
    test('rgb%', () => COLORS.forEach(v => expect(parseToHsl(v.rgbStrPercentage)).toEqual(v.hsl)));
    test('rgb-legacy', () => COLORS.forEach(v => expect(parseToHsl(v.rgbStrLegacy)).toEqual(v.hsl)));
    test('rgb-legacy%', () => COLORS.forEach(v => expect(parseToHsl(v.rgbStrLegacyPercentage)).toEqual(v.hsl)));
    test('hsl', () => COLORS.forEach(v => expect(parseToHsl(v.hslStr)).toEqual(v.hsl)));
    test('hsl-legacy', () => COLORS.forEach(v => expect(parseToHsl(v.hslStrLegacy)).toEqual(v.hsl)));
  });
  
  describe('hue unit', () => {
    const HSL: Hsl = {
      h: 90,
      s: 100,
      l: 50
    };
    
    test('modern format', () => {
      expect(parseToHsl('hsl(90deg 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(450deg 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(0.25turn 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(1.25TURN 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(100grad 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(500grad 100 50)')).toEqual(HSL);
      expect(parseToHsl('hsl(1.5708rad 100 50)')).toEqual(HSL);
    });
    
    test('rgb legacy format', () => {
      expect(parseToHsl('hsl(90deg, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(450deg, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(0.25turn, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(1.25turn, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(100grad, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(500grad, 100%, 50%)')).toEqual(HSL);
      expect(parseToHsl('hsl(1.5708rad, 100%, 50%)')).toEqual(HSL);
    });
  });
  
  describe('hsla - well formated', () => {
    const HSLA: Hsl = {
      h: 90,
      s: 100,
      l: 50,
      a: 57
    };
    
    test('rgb modern format', () => {
      expect(parseToHsl('hsl(90 100 50 / 57%)')).toEqual(HSLA);
      expect(parseToHsl('hsl(90 100 50 / 0.57)')).toEqual(HSLA);
      expect(parseToHsl('hsla(90 100 50 / 57%)')).toEqual(HSLA);
      expect(parseToHsl('hsla(90 100 50 / 0.57)')).toEqual(HSLA);
    });
    
    test('rgb legacy format - absolute values', () => {
      expect(parseToHsl('hsl(90, 100%, 50%, 57%)')).toEqual(HSLA);
      expect(parseToHsl('hsl(90, 100%, 50%, 0.57)')).toEqual(HSLA);
      expect(parseToHsl('hsla(90, 100%, 50%, 57%)')).toEqual(HSLA);
      expect(parseToHsl('hsla(90, 100%, 50%, 0.57)')).toEqual(HSLA);
    });
  });
  
  describe('hsl - ill formated', () => {
    test('whitespace insensitive', () => {
      const hsl = {
        h: 120,
        s: 50,
        l: 25
      };
      
      expect(parseToHsl('hsl(120 50% 25%)')).toEqual(hsl);
      expect(parseToHsl('hsl( 120  50% 25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120  50% 25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120  50%  25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120  50%   25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120  50%    25% )  ')).toEqual(hsl);
      
      expect(parseToHsl('hsl(120,50%,25%)')).toEqual(hsl);
      expect(parseToHsl('hsl( 120 ,50%,25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120 , 50%,25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120 , 50%, 25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120 , 50% , 25%)')).toEqual(hsl);
      expect(parseToHsl(' hsl( 120 , 50% , 25% )  ')).toEqual(hsl);
    });
    
    test('out-of-range values', () => {
      expect(parseToHsl('hsl(367 50% -50%)')).toEqual({
        h: 7,
        s: 50,
        l: 0
      });
      expect(parseToHsl('hsl(120 50% 101%)')).toEqual({
        h: 120,
        s: 50,
        l: 100
      });
      expect(parseToHsl('hsl(120 101 50%)')).toEqual({
        h: 120,
        s: 100,
        l: 50
      });
      expect(parseToHsl('hsl(361, 50%, 50%)')).toEqual({
        h: 1,
        s: 50,
        l: 50
      });
      expect(parseToHsl('hsl(120, 50%, 101%)')).toEqual({
        h: 120,
        s: 50,
        l: 100
      });
      expect(parseToHsl('hsl(120, 101%, 50%)')).toEqual({
        h: 120,
        s: 100,
        l: 50
      });
    });
    
    test('decimal values rounded 1', () => {
      expect(parseToHsl('hsl(120.5, 50.97%, 25.75%)')).toEqual({
        h: 120.5,
        s: 51,
        l: 25.8
      });
      
      expect(parseToHsl('hsl(120.5, 50.97%, 25.75%, 0.225678)')).toEqual({
        h: 120.5,
        s: 51,
        l: 25.8,
        a: 22.6
      });
    });
  });
});
