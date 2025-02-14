import {
  describe,
  expect,
  test
} from 'vitest';

import {
  darken
} from '../src';

describe('darken', () => {
  test('darken a color by 20%', () => {
    expect(darken('#444', 20)).toBe('#111');
  });
  
  test('darken an 8-digit hex color by 20%', () => {
    expect(darken('#6564CDB3', 20)).toBe('#333299b3');
  });
  
  test('darken an 4-digit hex color by 30%', () => {
    expect(darken('#0f08', 30)).toBe('#0608');
  });
  
  test('darken a color with opacity by 20%', () => {
    expect(darken('rgba(101,100,205,0.7)', 20)).toBe('rgb(51 50 153 / 70%)');
  });
  
  test('darken a color with a value of 255 and opacity by 10%', () => {
    expect(darken('rgba(255,140,140,0.7)', 10)).toBe('rgb(255 89 89 / 70%)');
  });
  
  test('darken a color but not go below 0', () => {
    expect(darken('rgba(40,20,10,0.7)', 80)).toBe('rgb(0 0 0 / 70%)');
  });
});
