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
  FetchErrorName
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.get('/api/any', 200);
    fetchMock.get('/api/get', 200);
    fetchMock.post('/api/post', 200);
    fetchMock.put('/api/put', 200);
    fetchMock.patch('/api/patch', 200);
    fetchMock.delete('/api/delete', 200);
    
    fetchMock.mock('/api/404', 404);
    fetchMock.mock('/api/500', 500);
    fetchMock.mock('/api/error', () => {
      throw new Error('Network ERROR');
    });
    fetchMock.mock('/api/timeout', () => new Promise(resolve => setTimeout(() => resolve('timeout result'), 250)));
    fetchMock.mock('/api/timeout-reject', () => new Promise((_, reject) => setTimeout(() => reject(new Error('Error after timeout')), 250)));
    fetchMock.mock('/api/abort', () => new Promise(resolve => setTimeout(() => resolve('abort result'), 20)));
  });
  
  test('response status 200', () => {
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    
    expect(fetchMock.calls().length).toBe(4);
  });
  
  test('response status NOT 200 is treated as success here', () => {
    fetcherFetch('/api/404');
    expect(fetchMock.calls().length).toBe(1);
    
    fetcherFetch('/api/500');
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('methods', () => {
    fetcherFetch('/api/get');
    expect(fetchMock.called('/api/get')).toBe(true);
    
    fetcherFetch('/api/get', {
      method: 'GET'
    });
    expect(fetchMock.called('/api/get')).toBe(true);
    
    fetcherFetch('/api/post', {
      method: 'POST'
    });
    expect(fetchMock.called('/api/post')).toBe(true);
    
    fetcherFetch('/api/put', {
      method: 'PUT'
    });
    expect(fetchMock.called('/api/put')).toBe(true);
    
    fetcherFetch('/api/patch', {
      method: 'patch'
    });
    expect(fetchMock.called('/api/patch')).toBe(true);
    
    fetcherFetch('/api/delete', {
      method: 'delete'
    });
    expect(fetchMock.called('/api/delete')).toBe(true);
    
    expect(fetchMock.calls().length).toBe(6);
  });
  
  test('error', () => {
    expect(fetcherFetch('/api/error')).rejects.toThrowError('Network ERROR');
    expect(fetchMock.calls().length).toBe(1);
  });
  
  test('timeout', () => {
    expect(fetcherFetch('/api/timeout', {
      timeout: 100
    })).rejects.toThrowError('fetcherFetch(/api/timeout) timeout after 100ms');
    expect(fetcherFetch('/api/timeout', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
    expect(fetcherFetch('/api/timeout').then(response => response.text())).resolves.toEqual('timeout result');
    expect(fetcherFetch('/api/timeout').then(response => response.json())).rejects.toThrowError(); // 返回的不是 JSON
  });
  
  test('timeout II - rejected', () => {
    expect(fetcherFetch('/api/timeout-reject', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
    expect(fetchMock.calls().length).toBe(1);
    
    expect(fetcherFetch('/api/timeout-reject').then(response => response.json())).rejects.toThrowError('Error after timeout');
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('abort', () => {
    const abortController = new AbortController();
    const promise = fetcherFetch('/api/abort', {
      signal: abortController.signal
    });
    
    expect(promise).rejects.toThrowError('The operation was aborted.');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    expect(fetchMock.calls().length).toBe(1);
    
    abortController.abort();
  });
});