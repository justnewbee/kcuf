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
  describe('FreeBSD', () => {
    test('FreeBSD', () => {
      const result = parseUa('Mozilla/5.0 (X11; FreeBSD amd64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.FREE_BSD);
    });
  });
});
