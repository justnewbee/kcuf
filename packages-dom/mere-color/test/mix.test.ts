import {
  describe,
  expect,
  test
} from 'vitest';

import {
  mix
} from '../src';

import {
  COLORS
} from './const';

describe('mix', () => {
  describe('same colors', () => {
    test('hex + hex', () => {
      COLORS.forEach(v => expect(mix(v.hexStr, v.hexStr)).toBe(v.hexStr));
    });
  });
  
  test('hex + hex 1:1', () => {
    expect(mix('#000', '#fff')).toBe('#808080');
    expect(mix('#fff', '#000')).toBe('#808080');
    expect(mix('#f00', '#00f')).toBe('#800080');
    expect(mix('#f00', '#0f0')).toBe('#808000');
    expect(mix('#0f0', '#00f')).toBe('#008080');
    expect(mix('#ff0', '#00f')).toBe('#808080');
    expect(mix('#ff0', '#0f0')).toBe('#80ff00');
    expect(mix('#ff0', '#f00')).toBe('#ff8000');
    expect(mix('#ff0', '#0ff')).toBe('#80ff80');
    expect(mix('#ff0', '#ff0')).toBe('#ff0');
  });
  
  test('mixed types 1:1', () => {
    expect(mix('#000', 'rgb(255,255,255)')).toBe('#808080');
    expect(mix('#fff', 'hsl(0,0%,0%)')).toBe('#808080');
    expect(mix('rgb(255 0 0)', 'rgb(0,0,255)')).toBe('rgb(128 0 128)');
    expect(mix('rgb(255,0,0)', '#00ff00')).toBe('rgb(128 128 0)');
    expect(mix('rgb(0,255,0)', 'hsl(240,100%,50%)')).toBe('rgb(0 128 128)');
    expect(mix('hsl(60,100%,50%)', '#0000ff')).toBe('hsl(0 0% 50.2%)');
    expect(mix('hsl(60,100%,50%)', 'rgb(0,255,0)')).toBe('hsl(89.9 100% 50%)');
    expect(mix('hsl(60,100%,50%)', 'hsl(0,100%,50%)')).toBe('hsl(30.1 100% 50%)');
    expect(mix('#ff0', '#0ff')).toBe('#80ff80');
    expect(mix('#ff0', '#ff0')).toBe('#ff0');
  });
  
  test('with alpha', () => {
    expect(mix('#0000', '#fff')).toBe('#80808080');
    expect(mix('#000', '#fff0')).toBe('#80808080');
  });
  //
  // test('rgb', () => {
  //   expect(mix('rgb(101 100 205)')).toBe('rgb(154 155 50)');
  //   expect(mix('rgb(101 100 205 / 0.7)')).toBe('rgb(154 155 50 / 70%)');
  //   expect(mix('rgb(101 100 205 / 70%)')).toBe('rgb(154 155 50 / 70%)');
  //   expect(mix('rgb(101, 100, 205)')).toBe('rgb(154 155 50)');
  //   expect(mix('rgba(101,100,205,0.7)')).toBe('rgb(154 155 50 / 70%)');
  // });
  //
  // test('hsl', () => {
  //   expect(mix('hsl(241 51% 60%)')).toBe('hsl(61.2 51% 40%)');
  //   expect(mix('hsl(241 51% 60% / 0.7)')).toBe('hsl(61.2 51% 40% / 70%)');
  //   expect(mix('hsla(241 51% 60% / 70%)')).toBe('hsl(61.2 51% 40% / 70%)');
  //   expect(mix('hsl(241, 51%, 60%)')).toBe('hsl(61.2 51% 40%)');
  //   expect(mix('hsla(241, 51%, 60%, 0.7)')).toBe('hsl(61.2 51% 40% / 70%)');
  // });
  //
  // test('transparent', () => {
  //   expect(mix('transparent')).toBe('#fff0');
  // });
});
