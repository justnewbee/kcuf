import {
  describe,
  test,
  expect
} from 'vitest';

import {
  UaOs,
  parseUa
} from '../src';

describe('parseUa - OS detection', () => {
  describe('macOS', () => {
    test('macOS (dot-separated version)', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('10.15');
    });
    
    test('macOS (underscore-separated version)', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('10.15.5');
    });
    
    test('macOS 12 Monterey', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('12.6');
    });
    
    test('macOS 13 Ventura', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('13.0');
    });
  });
});
