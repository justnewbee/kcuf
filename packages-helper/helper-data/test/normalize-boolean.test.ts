import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeBoolean
} from '../src';

describe('normalizeBoolean', () => {
  test('returns true for number 1', () => {
    expect(normalizeBoolean(1)).toBe(true);
  });

  test('returns true for string "1"', () => {
    expect(normalizeBoolean('1')).toBe(true);
  });

  test('returns true for string "true"', () => {
    expect(normalizeBoolean('true')).toBe(true);
  });

  test('returns true for string "TRUE"', () => {
    expect(normalizeBoolean('TRUE')).toBe(true);
  });

  test('returns false for number 0', () => {
    expect(normalizeBoolean(0)).toBe(false);
  });

  test('returns false for number 2', () => {
    expect(normalizeBoolean(2)).toBe(false);
  });

  test('returns false for string "false"', () => {
    expect(normalizeBoolean('false')).toBe(false);
  });

  test('returns false for string "0"', () => {
    expect(normalizeBoolean('0')).toBe(false);
  });

  test('returns false for string "True" (mixed case)', () => {
    expect(normalizeBoolean('True')).toBe(false);
  });
});
