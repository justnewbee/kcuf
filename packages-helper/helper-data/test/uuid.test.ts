import {
  describe,
  test,
  expect
} from 'vitest';

import {
  uuid
} from '../src';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('uuid', () => {
  test('returns a string', () => {
    expect(typeof uuid()).toBe('string');
  });
  
  test('returns a valid UUID v4 format', () => {
    expect(uuid()).toMatch(UUID_REGEX);
  });
  
  test('returns a unique value on each call', () => {
    expect(uuid()).not.toBe(uuid());
  });
});
