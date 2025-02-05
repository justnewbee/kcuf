import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getLuminance
} from '../src';

describe('getLuminance', () => {
  test('hex color', () => {
    expect(getLuminance('#444')).toEqual(0.058);
    expect(getLuminance('#444444')).toEqual(0.058);
  });
  
  test('4-digit hex color', () => {
    expect(getLuminance('#0f08')).toEqual(0.715);
    expect(getLuminance('#00ff0088')).toEqual(0.715);
  });
  
  test('8-digit hex color', () => {
    expect(getLuminance('#6564CDB3')).toEqual(0.163);
    expect(getLuminance('#6564cdb3')).toEqual(0.163);
  });
  
  test('rgb color', () => {
    expect(getLuminance('rgb(204 205 100)')).toEqual(0.574);
    expect(getLuminance('rgb(204,205,100)')).toEqual(0.574);
  });
  
  test('rgba color', () => {
    expect(getLuminance('rgba(101 100 205 / 0.7)')).toEqual(0.163);
    expect(getLuminance('rgba(101 100 205 / 70%)')).toEqual(0.163);
    expect(getLuminance('rgba(101,100,205,0.7)')).toEqual(0.163);
  });
  
  test('hls color', () => {
    expect(getLuminance('hsl(0 100% 50%)')).toEqual(0.213);
    expect(getLuminance('hsl(0, 100%, 50%)')).toEqual(0.213);
  });
  
  test('hlsa color', () => {
    expect(getLuminance('hsla(250 100% 50% / 0.2)')).toEqual(0.077);
    expect(getLuminance('hsla(250 100% 50% / 20%)')).toEqual(0.077);
    expect(getLuminance('hsla(250, 100%, 50%, 0.2)')).toEqual(0.077);
  });
  
  test('named CSS color', () => {
    expect(getLuminance('papayawhip')).toEqual(0.878);
  });
  
  test('should return 0 when passed transparent', () => {
    expect(getLuminance('transparent')).toEqual(0);
    expect(getLuminance('#0000')).toEqual(0);
  });
});
