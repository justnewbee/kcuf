import {
  describe,
  expect,
  test
} from 'vitest';

import {
  parse
} from '../src';

import {
  RED,
  INVALID_INPUTS
} from './const';

describe('parse', () => {
  test('invalid inputs', () => {
    INVALID_INPUTS.forEach(v => expect(parse(v)).toBeNull());
  });
  
  describe('type according to original', () => {
    test('name/hex/rgb → rgb', () => {
      expect(parse('red')).toEqual(RED.rgb);
      expect(parse('#f00')).toEqual(RED.rgb);
      expect(parse('#F00F')).toEqual(RED.rgb);
      expect(parse('#ff0000')).toEqual(RED.rgb);
      expect(parse('#ff0000ff')).toEqual(RED.rgb);
      expect(parse('rgb(255 0 0)')).toEqual(RED.rgb);
      expect(parse('rgba(255 0 0 / 1)')).toEqual(RED.rgb);
      expect(parse('rgba(255 0 0 / 100%)')).toEqual(RED.rgb);
      expect(parse('rgb(255,0,0)')).toEqual(RED.rgb);
    });
    
    test('hsl → hsl', () => {
      expect(parse('hsl(0 100 50)')).toEqual(RED.hsl);
      expect(parse('hsl(0 100% 50%)')).toEqual(RED.hsl);
      expect(parse('hsl(0 100% 50%)')).toEqual(RED.hsl);
      expect(parse('hsl(0 100% 50% / 100%)')).toEqual(RED.hsl);
      expect(parse('hsl(0, 100%, 50%, 1)')).toEqual(RED.hsl);
      expect(parse('hsl(0, 100%, 50%, 100%)')).toEqual(RED.hsl);
    });
  });
});
