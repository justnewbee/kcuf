import {
  describe,
  test,
  expect
} from 'vitest';

import {
  localSearchCompare
} from '../src';

describe('localSearchCompare', () => {
  test('returns true when keyword is empty', () => {
    expect(localSearchCompare('', ['abc'])).toBe(true);
  });
  
  test('returns true when keyword is whitespace only', () => {
    expect(localSearchCompare('   ', ['abc'])).toBe(true);
  });
  
  test('matches keyword contained in candidate (case-insensitive)', () => {
    expect(localSearchCompare('abc', ['xABCy'])).toBe(true);
  });
  
  test('does not match when keyword is not in any candidate', () => {
    expect(localSearchCompare('xyz', ['abc', 'def'])).toBe(false);
  });
  
  test('ignores whitespace by default', () => {
    expect(localSearchCompare('ab cd', ['abcd'])).toBe(true);
  });
  
  test('respects ignoreWhitespace: false', () => {
    expect(localSearchCompare('ab cd', ['abcd'], {
      ignoreWhitespace: false
    })).toBe(false);
  });
  
  test('bothWay: true allows candidate contained in keyword to match', () => {
    expect(localSearchCompare('ABCDEF', ['abc'], {
      bothWay: true
    })).toBe(true);
  });
  
  test('returns false when candidate value is empty string', () => {
    expect(localSearchCompare('abc', ['', '   '])).toBe(false);
  });
  
  test('returns true if any candidate matches', () => {
    expect(localSearchCompare('hello', ['world', 'hello world'])).toBe(true);
  });
});
