import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeId
} from '../src';

describe('normalizeId', () => {
  test('returns empty string for null', () => {
    expect(normalizeId(null)).toBe('');
  });

  test('returns empty string for undefined', () => {
    expect(normalizeId(undefined)).toBe('');
  });

  test('returns empty string for 0', () => {
    expect(normalizeId(0)).toBe('');
  });

  test('returns empty string for empty string', () => {
    expect(normalizeId('')).toBe('');
  });

  test('returns empty string for NaN', () => {
    expect(normalizeId(NaN)).toBe('');
  });

  test('passes through a non-empty string', () => {
    expect(normalizeId('abc-123')).toBe('abc-123');
  });

  test('converts a positive number to string', () => {
    expect(normalizeId(42)).toBe('42');
  });

  test('returns empty string for an object', () => {
    expect(normalizeId({
      id: 1
    })).toBe('');
  });

  test('returns empty string for an array', () => {
    expect(normalizeId([1, 2])).toBe('');
  });
});
