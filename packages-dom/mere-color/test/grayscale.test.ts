import {
  describe,
  expect,
  test
} from 'vitest';

import {
  grayscale
} from '../src';

import {
  INVALID_INPUTS
} from './const';

describe('grayscale', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(grayscale(v)).toBe(v));
  });
  
  test('hex', () => {
    expect(grayscale('#fff')).toBe('#fff');
    expect(grayscale('#000')).toBe('#000');
    expect(grayscale('#ccc')).toBe('#ccc');
    expect(grayscale('#ff0000')).toBe('#4d4d4d');
    expect(grayscale('#00ff00')).toBe('#969696');
    expect(grayscale('#0000ff')).toBe('#1c1c1c');
    expect(grayscale('#00cc00')).toBe('#787878');
    expect(grayscale('#cc0099')).toBe('#4e4e4e');
    expect(grayscale('#ff770078')).toBe('#93939378');
  });
  
  test('rgb', () => {
    expect(grayscale('rgb(101 100 205)')).toBe('rgb(112 112 112)');
    expect(grayscale('rgb(101 100 205 / 0.7)')).toBe('rgb(112 112 112 / 70%)');
    expect(grayscale('rgb(101 100 205 / 70%)')).toBe('rgb(112 112 112 / 70%)');
    expect(grayscale('rgb(101, 100, 205)')).toBe('rgb(112 112 112)');
    expect(grayscale('rgba(101,100,205,0.7)')).toBe('rgb(112 112 112 / 70%)');
    
    expect(grayscale('rgb(255 0 0)')).toBe('rgb(77 77 77)');
    expect(grayscale('rgb(0 255 0)')).toBe('rgb(150 150 150)');
    expect(grayscale('rgb(0 0 255)')).toBe('rgb(28 28 28)');
  });
  
  test('hsl', () => {
    expect(grayscale('hsl(241 51% 60%)')).toBe('hsl(0 0% 44.3%)');
    expect(grayscale('hsl(241 51% 60% / 0.7)')).toBe('hsl(0 0% 44.3% / 70%)');
    expect(grayscale('hsla(241 51% 60% / 70%)')).toBe('hsl(0 0% 44.3% / 70%)');
    expect(grayscale('hsl(241, 51%, 60%)')).toBe('hsl(0 0% 44.3%)');
    expect(grayscale('hsla(241, 51%, 60%, 0.7)')).toBe('hsl(0 0% 44.3% / 70%)');
  });
  
  test('transparent', () => {
    expect(grayscale('transparent')).toBe('#0000');
  });
});
