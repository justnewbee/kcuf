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
  describe('Windows', () => {
    test('Windows 10 (NT 10.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('10');
    });
    
    test('Windows 8.1 (NT 6.3)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('8.1');
    });
    
    test('Windows 8 (NT 6.2)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('8');
    });
    
    test('Windows 7 (NT 6.1)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('7');
    });
    
    test('Windows Vista (NT 6.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('Vista');
    });
    
    test('Windows XP (NT 5.1)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('XP');
    });
    
    test('Windows XP (NT 5.2)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('XP');
    });
    
    test('Windows 2000 (NT 5.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.0; rv:30.0) Gecko/20100101 Firefox/30.0');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('2000');
    });
    
    test('Windows NT unknown version', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('NT 11.0');
    });
    
    test('Windows Phone', () => {
      const result = parseUa('Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 1520)');
      
      expect(result.OS).toBe(UaOs.WINDOWS_PHONE);
      expect(result.OS_VERSION).toBe('8.0');
    });
    
    test('Windows Mobile', () => {
      const result = parseUa('Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/37.6270; U; en) Presto/2.12.423 Version/12.16');
      
      expect(result.OS).toBe(UaOs.WINDOWS_MOBILE);
    });
  });
});
