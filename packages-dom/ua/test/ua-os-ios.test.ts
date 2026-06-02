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
  describe('iOS', () => {
    test('iPhone iOS 11', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('11.0');
    });
    
    test('iPad iOS 14', () => {
      const result = parseUa('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('14.0');
    });
    
    test('iPhone iOS 16', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('16.0');
    });
    
    test('iPod touch', () => {
      const result = parseUa('Mozilla/5.0 (iPod touch; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/16A366 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('12.0');
    });
  });
});
