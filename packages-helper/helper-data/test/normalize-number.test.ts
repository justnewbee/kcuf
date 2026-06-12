import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeNumber
} from '../src';

describe('normalizeNumber', () => {
  test('returns the number for a valid number', () => {
    expect(normalizeNumber(42)).toBe(42);
  });

  test('returns the number for a numeric string', () => {
    expect(normalizeNumber('3.14')).toBe(3.14);
  });

  test('returns default fallback 0 for null', () => {
    expect(normalizeNumber(null)).toBe(0);
  });

  test('returns default fallback 0 for undefined', () => {
    expect(normalizeNumber(undefined)).toBe(0);
  });

  test('returns default fallback 0 for empty string', () => {
    expect(normalizeNumber('')).toBe(0);
  });

  test('returns default fallback 0 for NaN input', () => {
    expect(normalizeNumber(NaN)).toBe(0);
  });

  test('returns custom fallback for null', () => {
    expect(normalizeNumber(null, -1)).toBe(-1);
  });

  test('returns fallback for 0 (falsy)', () => {
    expect(normalizeNumber(0, 10)).toBe(10);
  });

  test('returns negative number correctly', () => {
    expect(normalizeNumber(-5)).toBe(-5);
  });
});
