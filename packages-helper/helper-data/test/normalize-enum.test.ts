import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeEnum
} from '../src';

enum EStatus {
  Active = 'active',
  Inactive = 'inactive'
}

describe('normalizeEnum', () => {
  test('returns value when it is a valid enum member', () => {
    expect(normalizeEnum(EStatus.Active, EStatus.Inactive)).toBe(EStatus.Active);
  });

  test('returns fallback for null', () => {
    expect(normalizeEnum(null, EStatus.Active)).toBe(EStatus.Active);
  });

  test('returns fallback for undefined', () => {
    expect(normalizeEnum(undefined, EStatus.Active)).toBe(EStatus.Active);
  });

  test('passes through string value as enum', () => {
    expect(normalizeEnum('active', EStatus.Inactive)).toBe('active');
  });

  test('passes through number value as enum', () => {
    expect(normalizeEnum(0, 99)).toBe(0);
  });

  test('returns fallback when value is null even if fallback is falsy', () => {
    expect(normalizeEnum(null, 0)).toBe(0);
  });
});
