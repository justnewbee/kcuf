import {
  describe,
  expect,
  test
} from 'vitest';

import {
  a11yReadableColor
} from '../src';

describe('a11yReadableColor', () => {
  test('black given white hex, #fff', () => {
    expect(a11yReadableColor('#fff')).toBe('#000');
  });
  
  test('white given black, #000', () => {
    expect(a11yReadableColor('#000')).toBe('#fff');
  });
  
  test('custom light color when passed a dark color', () => {
    expect(a11yReadableColor('black', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toBe('#ff8');
  });
  
  test('custom dark color when passed a light color', () => {
    expect(a11yReadableColor('white', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toBe('#001');
  });
  
  test('black given red, #FF0000', () => {
    expect(a11yReadableColor('#FF0000')).toBe('#000');
  });
  
  test('white given blue, #0000FF', () => {
    expect(a11yReadableColor('#0000FF')).toBe('#fff');
  });
  
  test('black given gray, #787878', () => {
    expect(a11yReadableColor('#787878')).toBe('#000');
  });
  
  test('white given gray, #757575', () => {
    expect(a11yReadableColor('#757575')).toBe('#fff');
  });
  
  test('white given black, #0000001A', () => {
    expect(a11yReadableColor('#0000001A')).toBe('#fff');
  });
  
  test('black given white, #FFFFFFBF', () => {
    expect(a11yReadableColor('#FFFFFFBF')).toBe('#000');
  });
  
  test('black given white, rgb(255,255,255)', () => {
    expect(a11yReadableColor('rgb(255,255,255)')).toBe('#000');
  });
  
  test('white given black, rgb(0,0,0)', () => {
    expect(a11yReadableColor('rgb(0,0,0)')).toBe('#fff');
  });
  
  test('black given rgb(120,120,120)', () => {
    expect(a11yReadableColor('rgb(120,120,120)')).toBe('#000');
  });
  
  test('white given rgb(117,117,117)', () => {
    expect(a11yReadableColor('rgb(117,117,117)')).toBe('#fff');
  });
  
  test('white given black, rgba(0,0,0,0.7)', () => {
    expect(a11yReadableColor('rgba(0,0,0,0.7)')).toBe('#fff');
  });
  
  test('white given black, rgba(0,0,0,0.1)', () => {
    expect(a11yReadableColor('rgba(0,0,0,0.1)')).toBe('#fff');
  });
  
  test('white given black, "black"', () => {
    expect(a11yReadableColor('black')).toBe('#fff');
  });
  
  test('black given papayawhip, "papayawhip"', () => {
    expect(a11yReadableColor('papayawhip')).toBe('#000');
  });
  
  test('black given palevioletred, "palevioletred"', () => {
    expect(a11yReadableColor('palevioletred')).toBe('#000');
  });
  
  test('black given white, "white"', () => {
    expect(a11yReadableColor('white')).toBe('#000');
  });
  
  test('black given red, hsl(0, 100%, 50%)', () => {
    expect(a11yReadableColor('hsl(0, 100%, 50%)')).toBe('#000');
  });
  
  test('white given blue, hsl(250, 100%, 50%)', () => {
    expect(a11yReadableColor('hsl(250, 100%, 50%)')).toBe('#fff');
  });
  
  test('black given gray, hsl(0, 0%, 47%)', () => {
    expect(a11yReadableColor('hsl(0, 0%, 47%)')).toBe('#000');
  });
  
  test('white given gray, hsl(0, 0%, 45%)', () => {
    expect(a11yReadableColor('hsl(0, 0%, 45%)')).toBe('#fff');
  });
  
  test('white given blue, hsla(250, 100%, 50%, 0.2)', () => {
    expect(a11yReadableColor('hsla(250, 100%, 50%, 0.2)')).toBe('#fff');
  });
  
  test('custom light background when contrast meets AA in strict mode', () => {
    expect(a11yReadableColor('red', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toBe('#001');
  });
  
  test('custom dark background when contrast meets AA in strict mode', () => {
    expect(a11yReadableColor('darkred', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toBe('#ff8');
  });
  
  test('the default light background when contrast fails AA in strict mode', () => {
    expect(a11yReadableColor('red', {
      whenBgLight: '#333',
      whenBgDark: '#aaa'
    })).toBe('#000');
  });
  
  test('the default dark background when contrast fails AA in strict mode', () => {
    expect(a11yReadableColor('darkred', {
      whenBgLight: '#333',
      whenBgDark: '#aaa'
    })).toBe('#fff');
  });
  
  test('the the passed colors when constrast fails AA with strict mode off', () => {
    expect(a11yReadableColor('darkred', {
      whenBgLight: '#333',
      whenBgDark: '#aaa',
      strict: false
    })).toBe('#aaa');
  });
});
