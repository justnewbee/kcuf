import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getContrastGuidelines
} from '../src';

describe('getContrastGuidelines', () => {
  test('should return the color contrast guidelines of two hex colors', () => {
    expect(getContrastGuidelines('#444', '#fff')).toEqual({
      contrast: 9.72,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two 8-digit hex colors', () => {
    expect(getContrastGuidelines('#6564CDB3', '#ffffff')).toEqual({
      contrast: 4.93,
      AA: true,
      AAA: false,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two 4-digit hex colors', () => {
    expect(getContrastGuidelines('#0f08', '#000')).toEqual({
      contrast: 15.3,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two rgba colors', () => {
    expect(getContrastGuidelines('rgba(101,100,205,0.7)', 'rgba(0,0,0,1)')).toEqual({
      contrast: 4.26,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two rgb colors', () => {
    expect(getContrastGuidelines('rgb(204,205,100)', 'rgb(0,0,0)')).toEqual({
      contrast: 12.48,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two hsla colors', () => {
    expect(getContrastGuidelines('hsla(250, 100%, 50%, 0.2)', 'hsla(0, 100%, 100%, 1)')).toEqual({
      contrast: 8.27,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two hsl colors', () => {
    expect(getContrastGuidelines('hsl(0, 100%, 50%)', 'hsl(0, 100%, 100%)')).toEqual({
      contrast: 3.99,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two named CSS colors', () => {
    expect(getContrastGuidelines('papayawhip', 'black')).toEqual({
      contrast: 18.56,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return failing contrast guidelines when used with a transparent color', () => {
    expect(getContrastGuidelines('transparent', '#000')).toEqual({
      contrast: 1,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: false
    });
  });
});
