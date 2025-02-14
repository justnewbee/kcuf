import {
  describe,
  expect,
  test
} from 'vitest';

import {
  fade,
  fadeIn,
  fadeOut
} from '../src';

describe('random', () => {
  test('fade', () => {
    expect(fade('#f00', 50)).toBe('#ff000080');
    expect(fade('rgb(255 128 0)', 20)).toBe('rgb(255 128 0 / 20%)');
    expect(fade('hsl(120 60% 70%)', 70)).toBe('hsl(120 59.5% 70% / 70%)');
  });
  
  test('fadeIn default', () => {
    expect(fadeIn('#f00')).toBe('#f00');
    expect(fadeIn('rgb(255 128 0)')).toBe('rgb(255 128 0)');
    expect(fadeIn('hsl(120 60% 70%)')).toBe('hsl(120 59.5% 70%)');
  });
  
  test('fadeIn', () => {
    expect(fadeIn('#f004', 15)).toBe('#ff00006a');
    expect(fadeIn('rgb(255 128 0 / 0.2)', 15)).toBe('rgb(255 128 0 / 35%)');
    expect(fadeIn('hsl(120 60% 70% / 0.3)', 15)).toBe('hsl(120 59.5% 70% / 45%)');
  });
  
  test('fadeIn max', () => {
    expect(fadeIn('#f009', 15, 20)).toBe('#f003');
    expect(fadeIn('rgb(255 128 0 / 0.2)', 15, 33)).toBe('rgb(255 128 0 / 33%)');
    expect(fadeIn('hsl(120 60% 70% / 0.3)', 15, 40)).toBe('hsl(120 59.5% 70% / 40%)');
  });
  
  test('fadeOut default', () => {
    expect(fadeOut('#f00')).toBe('#ff0000e6');
    expect(fadeOut('rgb(255 128 0)')).toBe('rgb(255 128 0 / 90%)');
    expect(fadeOut('hsl(120 60% 70%)')).toBe('hsl(120 59.5% 70% / 90%)');
  });
  
  test('fadeOut', () => {
    expect(fadeOut('#f00', 50)).toBe('#ff000080');
    expect(fadeOut('rgb(255 128 0)', 20)).toBe('rgb(255 128 0 / 80%)');
    expect(fadeOut('hsl(120 60% 70%)', 70)).toBe('hsl(120 59.5% 70% / 30%)');
  });
  
  test('fadeOut min', () => {
    expect(fadeOut('#f004', 50, 10)).toBe('#ff00001a');
    expect(fadeOut('rgb(255 128 0 / 0.4)', 20, 30)).toBe('rgb(255 128 0 / 30%)');
    expect(fadeOut('hsl(120 60% 70% / 60%)', 70, 10)).toBe('hsl(120 59.5% 70% / 10%)');
  });
});
