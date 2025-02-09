import {
  describe,
  expect,
  test
} from 'vitest';

import {
  a11yContrastGuidelines
} from '../src';

describe('a11yContrastGuidelines', () => {
  test('should return the color contrast guidelines of two hex colors', () => {
    expect(a11yContrastGuidelines('#444', '#fff')).toEqual({
      contrast: 9.722,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two 8-digit hex colors', () => {
    expect(a11yContrastGuidelines('#6564CDB3', '#ffffff')).toEqual({
      contrast: 4.93,
      AA: true,
      AAA: false,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two 4-digit hex colors', () => {
    expect(a11yContrastGuidelines('#0f08', '#000')).toEqual({
      contrast: 15.3,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two rgba colors', () => {
    expect(a11yContrastGuidelines('rgba(101,100,205,0.7)', 'rgba(0,0,0,1)')).toEqual({
      contrast: 4.26,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two rgb colors', () => {
    expect(a11yContrastGuidelines('rgb(204,205,100)', 'rgb(0,0,0)')).toEqual({
      contrast: 12.48,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two hsla colors', () => {
    expect(a11yContrastGuidelines('hsla(250, 100%, 50%, 0.2)', 'hsla(0, 100%, 100%, 1)')).toEqual({
      contrast: 8.268,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two hsl colors', () => {
    expect(a11yContrastGuidelines('hsl(0, 100%, 50%)', 'hsl(0, 100%, 100%)')).toEqual({
      contrast: 3.992,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: true
    });
  });
  
  test('should return the color contrast guidelines of two named CSS colors', () => {
    expect(a11yContrastGuidelines('papayawhip', 'black')).toEqual({
      contrast: 18.56,
      AA: true,
      AAA: true,
      AAALarge: true,
      AALarge: true
    });
  });
  
  test('should return failing contrast guidelines when used with a transparent color', () => {
    expect(a11yContrastGuidelines('transparent', '#000')).toEqual({
      contrast: 1,
      AA: false,
      AAA: false,
      AAALarge: false,
      AALarge: false
    });
  });
});
