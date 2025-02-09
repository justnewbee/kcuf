import {
  describe,
  expect,
  test
} from 'vitest';

import {
  invert
} from '../src';

import {
  INVALID_INPUTS
} from './const';

describe('invert', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(invert(v)).toBe(v));
  });
  
  test('hex', () => {
    expect(invert('#448')).toBe('#bb7');
    expect(invert('#0f08')).toBe('#f0f8');
    expect(invert('#CCCD64')).toBe('#33329b');
    expect(invert('#6564CDB3')).toBe('#9a9b32b3');
  });
  
  test('rgb', () => {
    expect(invert('rgb(101 100 205)')).toBe('rgb(154 155 50)');
    expect(invert('rgb(101 100 205 / 0.7)')).toBe('rgb(154 155 50 / 70%)');
    expect(invert('rgb(101 100 205 / 70%)')).toBe('rgb(154 155 50 / 70%)');
    expect(invert('rgb(101, 100, 205)')).toBe('rgb(154 155 50)');
    expect(invert('rgba(101,100,205,0.7)')).toBe('rgb(154 155 50 / 70%)');
  });
  
  test('hsl', () => {
    expect(invert('hsl(241 51% 60%)')).toBe('hsl(61.2 51% 40%)');
    expect(invert('hsl(241 51% 60% / 0.7)')).toBe('hsl(61.2 51% 40% / 70%)');
    expect(invert('hsla(241 51% 60% / 70%)')).toBe('hsl(61.2 51% 40% / 70%)');
    expect(invert('hsl(241, 51%, 60%)')).toBe('hsl(61.2 51% 40%)');
    expect(invert('hsla(241, 51%, 60%, 0.7)')).toBe('hsl(61.2 51% 40% / 70%)');
  });
  
  test('transparent', () => {
    expect(invert('transparent')).toBe('#fff0');
  });
});
