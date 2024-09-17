/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach
} from 'vitest';
import fetchMock from 'fetch-mock';

import pkgInfo from '../package.json';
import fetcherFetch, {
  FetchError
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
  });
  
  test('fetcherFetch 200', () => {
    fetchMock.mock('*', 200);
    
    fetcherFetch('/api-1');
    fetcherFetch('/api-2');
    fetcherFetch('/api-3');
    fetcherFetch('/api-4');
    
    expect(fetchMock.calls().length).toBe(4);
  });
  
  test('fetcherFetch status not 200 is treated as success here', () => {
    fetchMock.mock('/api-404', 404);
    fetchMock.mock('/api-500', 500);
    
    expect(fetcherFetch('/api-404'));
    expect(fetchMock.calls().length).toBe(1);
    expect(fetcherFetch('/api-500'));
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('fetcherFetch error', () => {
    fetchMock.mock('/api-error', () => {
      throw new Error('Network ERROR');
    });
    
    expect(fetcherFetch('/api-error')).rejects.toThrowError('Network ERROR');
    expect(fetchMock.calls().length).toBe(1);
  });
  
  test('fetcherFetch timeout', () => {
    fetchMock.mock('/api-timeout', () => new Promise(resolve => setTimeout(() => resolve('timeout result'), 250)));
    
    expect(fetcherFetch('/api-timeout', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchError.TIMEOUT);
    expect(fetchMock.calls().length).toBe(1);
    
    expect(fetcherFetch('/api-timeout').then(response => response.text())).resolves.toEqual('timeout result');
    expect(fetchMock.calls().length).toBe(2);
    
    expect(fetcherFetch('/api-timeout').then(response => response.json())).rejects.toThrowError(); // 返回的不是 JSON
    expect(fetchMock.calls().length).toBe(3);
  });
  
  test('fetcherFetch timeout II - rejected', () => {
    fetchMock.mock('/api-timeout-reject', () => new Promise((_, reject) => setTimeout(() => reject(new Error('Error after timeout')), 250)));
    
    expect(fetcherFetch('/api-timeout-reject', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchError.TIMEOUT);
    expect(fetchMock.calls().length).toBe(1);
    
    expect(fetcherFetch('/api-timeout-reject').then(response => response.json())).rejects.toThrowError('Error after timeout');
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('fetcherFetch abort', () => {
    fetchMock.mock('/api-abort', () => new Promise(resolve => setTimeout(() => resolve('abort result'), 20)));
    
    const abortController = new AbortController();
    const promise = fetcherFetch('/api-abort', {
      signal: abortController.signal
    });
    
    expect(promise).rejects.toThrowError('The operation was aborted.');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    expect(fetchMock.calls().length).toBe(1);
    
    abortController.abort();
  });
});