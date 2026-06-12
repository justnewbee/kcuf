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
  describe('Other OS', () => {
    test('unknown OS', () => {
      const result = parseUa('SomeRobot/1.0 (compatible; SpecialDevice)');
      
      expect(result.OS).toBe(UaOs.OTHER);
      expect(result.OS_VERSION).toBe('');
    });
  });
});
