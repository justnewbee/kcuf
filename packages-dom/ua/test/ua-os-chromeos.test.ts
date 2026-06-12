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
  describe('Chrome OS', () => {
    test('Chromebook', () => {
      const result = parseUa('Mozilla/5.0 (X11; CrOS x86_64 14268.67.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.111 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.CHROME_OS);
    });
  });
});
