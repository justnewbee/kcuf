import {
  describe,
  expect,
  test
} from 'vitest';

import {
  isEqual,
  isDark,
  isLight
} from '../src';

describe('judgement', () => {
  test('isEqual', () => {
    expect(isEqual('#f00', 'red')).toBe(true);
    expect(isEqual('#ff0000', 'red')).toBe(true);
    expect(isEqual('#ff0000ff', 'red')).toBe(true);
    expect(isEqual('#F00', 'rgb(255,0,0)')).toBe(true);
    expect(isEqual('#F00', 'rgb(255,0,0,1)')).toBe(true);
    expect(isEqual('#F00', 'rgb(255 0 0 / 100%)')).toBe(true);
    expect(isEqual('#F00', 'hsl(0 100% 50%)')).toBe(true);
    expect(isEqual('red', 'hsl(0 100% 50% / 100%)')).toBe(true);
    
    expect(isEqual('#f00', 'yellow')).toBe(false);
    expect(isEqual('#f00', '#fe0000')).toBe(false);
  });
  
  test('isDark', () => {
    expect(isDark('#000')).toBe(true);
    expect(isDark('#c0f')).toBe(true);
    expect(isDark('#000fffcc')).toBe(true);
    
    expect(isDark('notcolor')).toBe(false);
  });
  
  test('isLight', () => {
    expect(isLight('#f0f')).toBe(false);
    expect(isLight('#ff0')).toBe(true);
    expect(isLight('#f90')).toBe(true);
    expect(isLight('#0f08')).toBe(true);
    
    expect(isLight('notcolor')).toBe(false);
  });
});
