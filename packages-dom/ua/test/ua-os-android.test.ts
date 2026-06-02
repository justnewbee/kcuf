import {
  describe,
  expect,
  test
} from 'vitest';

import {
  UaOs,
  parseUa
} from '../src';

describe('parseUa - OS detection', () => {
  describe('Android', () => {
    test('Android 9', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 9; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Mobile Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('9');
    });
    
    test('Android 10', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 10; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('10');
    });
    
    test('Android 12 tablet', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('12');
    });
  });
});
