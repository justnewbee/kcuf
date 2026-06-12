import {
  describe,
  test,
  expect
} from 'vitest';

import {
  isEmptyPagedList
} from '../src';

describe('isEmptyPagedList', () => {
  test('returns true for empty list', () => {
    expect(isEmptyPagedList({
      total: 0,
      page: 1,
      pageSize: 10,
      list: []
    })).toBe(true);
  });
  
  test('returns false for non-empty list', () => {
    expect(isEmptyPagedList({
      total: 1,
      page: 1,
      pageSize: 10,
      list: ['item']
    })).toBe(false);
  });
  
  test('returns false for list with multiple items', () => {
    expect(isEmptyPagedList({
      total: 3,
      page: 1,
      pageSize: 10,
      list: [1, 2, 3]
    })).toBe(false);
  });
});
