import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getReadableColor
} from '../src';

describe('getReadableColor', () => {
  test('black given white hex, #fff', () => {
    expect(getReadableColor('#fff')).toEqual('#000');
  });
  
  test('white given black, #000', () => {
    expect(getReadableColor('#000')).toEqual('#fff');
  });
  
  test('custom light color when passed a dark color', () => {
    expect(getReadableColor('black', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toEqual('#ff8');
  });
  
  test('custom dark color when passed a light color', () => {
    expect(getReadableColor('white', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toEqual('#001');
  });
  
  test('black given red, #FF0000', () => {
    expect(getReadableColor('#FF0000')).toEqual('#000');
  });
  
  test('white given blue, #0000FF', () => {
    expect(getReadableColor('#0000FF')).toEqual('#fff');
  });
  
  test('black given gray, #787878', () => {
    expect(getReadableColor('#787878')).toEqual('#000');
  });
  
  test('white given gray, #757575', () => {
    expect(getReadableColor('#757575')).toEqual('#fff');
  });
  
  test('white given black, #0000001A', () => {
    expect(getReadableColor('#0000001A')).toEqual('#fff');
  });
  
  test('black given white, #FFFFFFBF', () => {
    expect(getReadableColor('#FFFFFFBF')).toEqual('#000');
  });
  
  test('black given white, rgb(255,255,255)', () => {
    expect(getReadableColor('rgb(255,255,255)')).toEqual('#000');
  });
  
  test('white given black, rgb(0,0,0)', () => {
    expect(getReadableColor('rgb(0,0,0)')).toEqual('#fff');
  });
  
  test('black given rgb(120,120,120)', () => {
    expect(getReadableColor('rgb(120,120,120)')).toEqual('#000');
  });
  
  test('white given rgb(117,117,117)', () => {
    expect(getReadableColor('rgb(117,117,117)')).toEqual('#fff');
  });
  
  test('white given black, rgba(0,0,0,0.7)', () => {
    expect(getReadableColor('rgba(0,0,0,0.7)')).toEqual('#fff');
  });
  
  test('white given black, rgba(0,0,0,0.1)', () => {
    expect(getReadableColor('rgba(0,0,0,0.1)')).toEqual('#fff');
  });
  
  test('white given black, "black"', () => {
    expect(getReadableColor('black')).toEqual('#fff');
  });
  
  test('black given papayawhip, "papayawhip"', () => {
    expect(getReadableColor('papayawhip')).toEqual('#000');
  });
  
  test('black given palevioletred, "palevioletred"', () => {
    expect(getReadableColor('palevioletred')).toEqual('#000');
  });
  
  test('black given white, "white"', () => {
    expect(getReadableColor('white')).toEqual('#000');
  });
  
  test('black given red, hsl(0, 100%, 50%)', () => {
    expect(getReadableColor('hsl(0, 100%, 50%)')).toEqual('#000');
  });
  
  test('white given blue, hsl(250, 100%, 50%)', () => {
    expect(getReadableColor('hsl(250, 100%, 50%)')).toEqual('#fff');
  });
  
  test('black given gray, hsl(0, 0%, 47%)', () => {
    expect(getReadableColor('hsl(0, 0%, 47%)')).toEqual('#000');
  });
  
  test('white given gray, hsl(0, 0%, 45%)', () => {
    expect(getReadableColor('hsl(0, 0%, 45%)')).toEqual('#fff');
  });
  
  test('white given blue, hsla(250, 100%, 50%, 0.2)', () => {
    expect(getReadableColor('hsla(250, 100%, 50%, 0.2)')).toEqual('#fff');
  });
  
  test('custom light background when contrast meets AA in strict mode', () => {
    expect(getReadableColor('red', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toEqual('#001');
  });
  
  test('custom dark background when contrast meets AA in strict mode', () => {
    expect(getReadableColor('darkred', {
      whenBgLight: '#001',
      whenBgDark: '#ff8'
    })).toEqual('#ff8');
  });
  
  test('the default light background when contrast fails AA in strict mode', () => {
    expect(getReadableColor('red', {
      whenBgLight: '#333',
      whenBgDark: '#aaa'
    })).toEqual('#000');
  });
  
  test('the default dark background when contrast fails AA in strict mode', () => {
    expect(getReadableColor('darkred', {
      whenBgLight: '#333',
      whenBgDark: '#aaa'
    })).toEqual('#fff');
  });
  
  test('the the passed colors when constrast fails AA with strict mode off', () => {
    expect(getReadableColor('darkred', {
      whenBgLight: '#333',
      whenBgDark: '#aaa',
      strict: false
    })).toEqual('#aaa');
  });
});
