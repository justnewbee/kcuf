import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeTime
} from '../src';

describe('normalizeTime', () => {
  test('returns a Date instance', () => {
    expect(normalizeTime(0)).toBeInstanceOf(Date);
  });
  
  test('parses a numeric timestamp', () => {
    const ts = 1700000000000;
    
    expect(normalizeTime(ts).getTime()).toBe(ts);
  });
  
  test('parses an ISO date string', () => {
    const iso = '2024-01-15T10:30:00.000Z';
    
    expect(normalizeTime(iso).toISOString()).toBe(iso);
  });
  
  test('parses a date string', () => {
    const result = normalizeTime('2024-01-15');
    
    expect(result).toBeInstanceOf(Date);
    expect(isNaN(result.getTime())).toBe(false);
  });
  
  test('returns Invalid Date for invalid string', () => {
    const result = normalizeTime('not-a-date');
    
    expect(isNaN(result.getTime())).toBe(true);
  });
});
