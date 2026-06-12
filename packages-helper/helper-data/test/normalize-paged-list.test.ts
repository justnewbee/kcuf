import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizePagedList
} from '../src';

describe('normalizePagedList', () => {
  test('builds correct paged list without convert', () => {
    const result = normalizePagedList([1, 2, 3], 10, 1, 20);
    
    expect(result).toEqual({
      total: 10,
      page: 1,
      pageSize: 20,
      list: [1, 2, 3]
    });
  });
  
  test('applies convert function to each item', () => {
    const raw = [{
      id: 1,
      name: 'a'
    }, {
      id: 2,
      name: 'b'
    }];
    const result = normalizePagedList(raw, 2, 1, 10, item => item.name);
    
    expect(result.list).toEqual(['a', 'b']);
  });
  
  test('handles empty list', () => {
    const result = normalizePagedList([], 0, 1, 10);
    
    expect(result).toEqual({
      total: 0,
      page: 1,
      pageSize: 10,
      list: []
    });
  });
  
  test('preserves total, page, pageSize correctly', () => {
    const result = normalizePagedList(['x'], 100, 3, 25);
    
    expect(result.total).toBe(100);
    expect(result.page).toBe(3);
    expect(result.pageSize).toBe(25);
  });
});
