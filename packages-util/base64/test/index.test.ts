import {
  describe,
  expect,
  test
} from 'vitest';

import {
  encode,
  decode
} from '../src';

const HELLO_WORLD = 'hello, world!';
const HELLO_WORLD_ENCODED = 'aGVsbG8sIHdvcmxkIQ==';
const HELLO_WORLD_ENCODED_SAFE = 'aGVsbG8sIHdvcmxkIQ';
const HELLO_WORLD_CHINESE = '你好，世界！';
const HELLO_WORLD_CHINESE_ENCODED = '5L2g5aW977yM5LiW55WM77yB';
const HELLO_WORLD_CHINESE_ENCODED_SAFE = '5L2g5aW977yM5LiW55WM77yB';
const STRANGE_CHINESE = '弾';
const STRANGE_CHINESE_ENCODED = '5by+';
const STRANGE_CHINESE_ENCODED_SAFE = '5by-';

describe('base64', () => {
  describe('encode non-unicode', () => {
    test('should encode right', () => {
      expect(encode(HELLO_WORLD)).toBe(HELLO_WORLD_ENCODED);
    });
    
    test('should encode right (url safe)', () => {
      expect(encode(HELLO_WORLD, true)).toBe(HELLO_WORLD_ENCODED_SAFE);
    });
  });
  
  describe('encode unicode (should NOT throw as window.btoa does)', () => {
    test('should encode right', () => {
      expect(encode(HELLO_WORLD_CHINESE)).toBe(HELLO_WORLD_CHINESE_ENCODED);
    });
    
    test('should encode right (url safe)', () => {
      expect(encode(HELLO_WORLD_CHINESE, true)).toBe(HELLO_WORLD_CHINESE_ENCODED_SAFE);
    });
    
    test('should encode right (ends with +)', () => {
      expect(encode(STRANGE_CHINESE)).toBe(STRANGE_CHINESE_ENCODED);
    });
    
    test('should encode right (url safe, + will be replaced by -)', () => {
      expect(encode(STRANGE_CHINESE, true)).toBe(STRANGE_CHINESE_ENCODED_SAFE);
    });
  });
  
  describe('decode', () => {
    test('should decode back to original, whether safe or not', () => {
      expect(decode(HELLO_WORLD_ENCODED)).toBe(HELLO_WORLD);
      expect(decode(HELLO_WORLD_ENCODED_SAFE)).toBe(HELLO_WORLD);
      expect(decode(HELLO_WORLD_CHINESE_ENCODED)).toBe(HELLO_WORLD_CHINESE);
      expect(decode(HELLO_WORLD_CHINESE_ENCODED_SAFE)).toBe(HELLO_WORLD_CHINESE);
      expect(decode(STRANGE_CHINESE_ENCODED)).toBe(STRANGE_CHINESE);
      expect(decode(STRANGE_CHINESE_ENCODED_SAFE)).toBe(STRANGE_CHINESE);
    });
  });
  
  describe('encode & decode back', () => {
    test('what is what', () => {
      ['123abc', '中文', '日本語（にほんご）', '한국어', 'Français', 'Русский', 'Tiếng Việt', '💥', '🤪😜🥺'].forEach(v => expect(decode(encode(v))).toBe(v));
    });
  });
});
