import {
  describe,
  expect,
  test
} from 'vitest';

import {
  ColorRgb,
  parseToRgb
} from '../src';

import {
  INVALID_INPUTS,
  RED,
  BLUE,
  COLORS
} from './const';

describe('parseToRgb', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(parseToRgb(v)).toBeNull());
  });
  
  describe('predefined colors', () => {
    test('named', () => COLORS.forEach(v => expect(parseToRgb(v.name)).toEqual(v.rgb)));
    test('hex', () => COLORS.forEach(v => expect(parseToRgb(v.hexStr)).toEqual(v.rgb)));
    test('rgb', () => COLORS.forEach(v => expect(parseToRgb(v.rgbStr)).toEqual(v.rgb)));
    test('rgb%', () => COLORS.forEach(v => expect(parseToRgb(v.rgbStrPercentage)).toEqual(v.rgb)));
    test('rgb-legacy', () => COLORS.forEach(v => expect(parseToRgb(v.rgbStrLegacy)).toEqual(v.rgb)));
    test('rgb-legacy%', () => COLORS.forEach(v => expect(parseToRgb(v.rgbStrLegacyPercentage)).toEqual(v.rgb)));
    test('hsl', () => COLORS.forEach(v => expect(parseToRgb(v.hslStr)).toEqual(v.rgb)));
    test('hsl-legacy', () => COLORS.forEach(v => expect(parseToRgb(v.hslStrLegacy)).toEqual(v.rgb)));
  });
  
  describe('more hex', () => {
    test('hex3', () => {
      expect(parseToRgb('#abc')).toEqual({
        r: 170,
        g: 187,
        b: 204
      });
    });
    
    test('hex4', () => {
      expect(parseToRgb('#1230')).toEqual({
        r: 17,
        g: 34,
        b: 51,
        a: 0
      });
      expect(parseToRgb('#1234')).toEqual({
        r: 17,
        g: 34,
        b: 51,
        a: 26.7
      });
      expect(parseToRgb('#123f')).toEqual({
        r: 17,
        g: 34,
        b: 51
      });
    });
    
    test('hex6', () => {
      expect(parseToRgb('#FF8000')).toEqual({
        r: 255,
        g: 128,
        b: 0
      });
    });
    
    test('hex8', () => {
      expect(parseToRgb('#ffcc9900')).toEqual({
        r: 255,
        g: 204,
        b: 153,
        a: 0
      });
      expect(parseToRgb('#ffcc9977')).toEqual({
        r: 255,
        g: 204,
        b: 153,
        a: 46.7
      });
      expect(parseToRgb('#ffcc99FF')).toEqual({
        r: 255,
        g: 204,
        b: 153
      });
    });
  });
  
  describe('rgba', () => {
    const RGBA: ColorRgb = {
      r: 255,
      g: 0,
      b: 128,
      a: 57
    };
    
    test('modern format - absolute values', () => {
      expect(parseToRgb('rgb(255 0 128 / 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgb(255 0 128 / 0.57)')).toEqual(RGBA);
      expect(parseToRgb('rgba(255 0 128 / 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgba(255 0 128 / 0.57)')).toEqual(RGBA);
    });
    
    test('rgb modern format - percentage values', () => {
      expect(parseToRgb('rgb(100% 0 128 / 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgb(100% 0 128 / 0.57)')).toEqual(RGBA);
      expect(parseToRgb('rgba(100% 0 128 / 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgba(100% 0 128 / 0.57)')).toEqual(RGBA);
    });
    
    test('rgb legacy format - absolute values', () => {
      expect(parseToRgb('rgb(255, 0, 128, 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgb(255, 0, 128, 0.57)')).toEqual(RGBA);
      expect(parseToRgb('rgba(255, 0, 128, 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgba(255, 0, 128, 0.57)')).toEqual(RGBA);
    });
    
    test('rgb legacy format - percentage values', () => {
      expect(parseToRgb('rgb(100%, 0%, 50.196078%, 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgb(100%, 0%, 50.196078%, 0.57)')).toEqual(RGBA);
      expect(parseToRgb('rgba(100%, 0%, 50.196078%, 57%)')).toEqual(RGBA);
      expect(parseToRgb('rgba(100%, 0%, 50.196078%, 0.57)')).toEqual(RGBA);
    });
  });
  
  describe('ill formated', () => {
    test('uppercase', () => {
      expect(parseToRgb('RGB(255 0 0)')).toEqual(RED.rgb);
      expect(parseToRgb('rgB(255, 0, 0)')).toEqual(RED.rgb);
      expect(parseToRgb('rgBA(255, 10, 20, 0.2)')).toEqual({
        r: 255,
        g: 10,
        b: 20,
        a: 20
      });
    });
    
    test('decimal values will be rounded', () => {
      expect(parseToRgb('rgb(127.5 63.75 191.25)')).toEqual({
        r: 128,
        g: 64,
        b: 191
      });
      expect(parseToRgb('rgb(127.5, 63.75, 191.25)')).toEqual({
        r: 128,
        g: 64,
        b: 191
      });
    });
    
    test('whitespace trim and inside parenthesis ignored', () => {
      expect(parseToRgb(' rgb(  255   128   0  )')).toEqual({
        r: 255,
        g: 128,
        b: 0
      });
      
      expect(parseToRgb('rgb(  255,   128  , 0  ) ')).toEqual({
        r: 255,
        g: 128,
        b: 0
      });
      expect(parseToRgb(' rgb(255,128,0) ')).toEqual({
        r: 255,
        g: 128,
        b: 0
      });
    });
    
    test('out-of-range values (> 255 or < 0)', () => {
      expect(parseToRgb('rgb(256 0 0)')).toEqual(RED.rgb);
      expect(parseToRgb('rgb(256, 0, 0)')).toEqual(RED.rgb);
      expect(parseToRgb('rgb(0 0 300)')).toEqual(BLUE.rgb);
      expect(parseToRgb('rgb(0, 0, 300)')).toEqual(BLUE.rgb);
      expect(parseToRgb('rgb(200% -1 0)')).toEqual(RED.rgb);
      expect(parseToRgb('rgba(100 200 -50 / 5)')).toEqual({
        r: 100,
        g: 200,
        b: 0
      });
      expect(parseToRgb('rgba(100 200 -50 / 0.5)')).toEqual({
        r: 100,
        g: 200,
        b: 0,
        a: 50
      });
      expect(parseToRgb('rgba(100, 200, 50, 102%)')).toEqual({
        r: 100,
        g: 200,
        b: 50
      });
    });
  });
  
  test('colorful 2', () => {
    expect(parseToRgb('hsl(0 50% 50%)')).toEqual({
      r: 191,
      g: 64,
      b: 64
    });
    expect(parseToRgb('hsl(60 50% 50%)')).toEqual({
      r: 191,
      g: 191,
      b: 64
    });
    expect(parseToRgb('hsl(120 50% 50%)')).toEqual({
      r: 64,
      g: 191,
      b: 64
    });
    expect(parseToRgb('hsl(180 50% 50%)')).toEqual({
      r: 64,
      g: 191,
      b: 191
    });
    expect(parseToRgb('hsl(240 50% 50%)')).toEqual({
      r: 64,
      g: 64,
      b: 191
    });
    expect(parseToRgb('hsl(300 50% 50%)')).toEqual({
      r: 191,
      g: 64,
      b: 191
    });
  });
});
