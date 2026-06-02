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
  describe('Linux distros', () => {
    test('Ubuntu', () => {
      const result = parseUa('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0');
      
      expect(result.OS).toBe(UaOs.UBUNTU);
    });
    
    test('Fedora', () => {
      const result = parseUa('Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:75.0) Gecko/20100101 Firefox/75.0');
      
      expect(result.OS).toBe(UaOs.FEDORA);
    });
    
    test('Generic Linux', () => {
      const result = parseUa('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.LINUX);
    });
  });
});
