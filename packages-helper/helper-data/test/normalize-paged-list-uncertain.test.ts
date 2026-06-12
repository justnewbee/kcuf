import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizePagedListUncertain
} from '../src';

describe('normalizePagedListUncertain', () => {
  test('hasMore is true when list length equals pageSize', () => {
    const result = normalizePagedListUncertain([1, 2, 3], 1, 3);
    
    expect(result.hasMore).toBe(true);
  });
  
  test('hasMore is true when list length exceeds pageSize', () => {
    const result = normalizePagedListUncertain([1, 2, 3, 4], 1, 3);
    
    expect(result.hasMore).toBe(true);
  });
  
  test('hasMore is false when list length is less than pageSize', () => {
    const result = normalizePagedListUncertain([1, 2], 1, 3);
    
    expect(result.hasMore).toBe(false);
  });
  
  test('hasMore is false for empty list', () => {
    const result = normalizePagedListUncertain([], 1, 10);
    
    expect(result.hasMore).toBe(false);
  });
  
  test('applies convert function', () => {
    const raw = [{
      value: 'a'
    }, {
      value: 'b'
    }];
    const result = normalizePagedListUncertain(raw, 1, 10, item => item.value);
    
    expect(result.list).toEqual(['a', 'b']);
  });
  
  test('builds correct shape', () => {
    const result = normalizePagedListUncertain([1, 2], 2, 5);
    
    expect(result).toEqual({
      page: 2,
      pageSize: 5,
      hasMore: false,
      list: [1, 2]
    });
  });
});
