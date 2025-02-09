import {
  describe,
  expect,
  test
} from 'vitest';

import {
  rotate
} from '../src';

import {
  INVALID_INPUTS
} from './const';

describe('rotate', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(rotate(v, 30)).toBe(v));
  });
  
  test('hex', () => {
    expect(rotate('#fff', 180)).toBe('#fff');
    expect(rotate('#000', 180)).toBe('#000');
    expect(rotate('#ccc', 90)).toBe('#ccc');
    expect(rotate('#f00', 180)).toBe('#0ff');
    expect(rotate('#0f0', 180)).toBe('#f0f');
    expect(rotate('#00f', 180)).toBe('#ff0');
    expect(rotate('#00cc00', 90)).toBe('#06c');
    expect(rotate('#c09', 123)).toBe('#8fcc00');
    expect(rotate('#f709', 45)).toBe('#c8ff0099');
  });
  
  test('rgb', () => {
    expect(rotate('rgb(255 26 26)', 0)).toBe('rgb(255 26 26)');
    expect(rotate('rgb(254 27 27)', 30)).toBe('rgb(254 141 27)');
    expect(rotate('rgb(253 28 28)', -30)).toBe('rgb(253 28 141)');
    expect(rotate('rgb(252 29 29)', 400)).toBe('rgb(252 178 29)');
    expect(rotate('rgb(250 30 30 / 77%)', 127)).toBe('rgb(30 250 56 / 77%)');
    
    expect(rotate('rgb(249, 31, 31)', 0)).toBe('rgb(249 31 31)');
    expect(rotate('rgb(248, 32, 32)', -30)).toBe('rgb(248 32 140)');
    expect(rotate('rgb(247, 34, 34)', 400)).toBe('rgb(247 176 34)');
    expect(rotate('rgba(246, 35, 35, 0.77)', 127)).toBe('rgb(35 246 60 / 77%)');
  });
  
  test('hsl', () => {
    expect(rotate('hsl(0 100% 55%)', 0)).toBe('hsl(0 100% 55%)');
    expect(rotate('hsl(0 99% 55%)', 30)).toBe('hsl(30 99% 55%)');
    expect(rotate('hsl(0 98% 55%)', -30)).toBe('hsl(330 98% 55%)');
    expect(rotate('hsl(0 97% 55%)', 400)).toBe('hsl(40 97% 55%)');
    expect(rotate('hsl(0 96% 55% / 77%)', 127)).toBe('hsl(127 96% 55% / 77%)');
    
    expect(rotate('hsl(0, 95%, 55%)', 0)).toBe('hsl(0 95% 55%)');
    expect(rotate('hsl(0, 94%, 55%)', -30)).toBe('hsl(330 94% 55%)');
    expect(rotate('hsl(0, 93%, 55%)', 400)).toBe('hsl(40 93% 55%)');
    expect(rotate('hsla(0, 92%, 55%, 0.77)', 127)).toBe('hsl(127 92% 55% / 77%)');
  });
});
