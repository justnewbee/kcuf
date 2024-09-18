/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  afterEach
} from 'vitest';
import fetchMock from 'fetch-mock';

import pkgInfo from '../package.json';
import fetcherFetch, {
  FetchErrorName
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  afterEach(() => {
    fetchMock.reset();
  });
  
  test('response status 200', () => {
    fetchMock.mock('*', 200);
    
    fetcherFetch('/api/1');
    fetcherFetch('/api/2');
    fetcherFetch('/api/3');
    fetcherFetch('/api/4');
    
    expect(fetchMock.calls().length).toBe(4);
  });
  
  test('response status NOT 200 is treated as success here', () => {
    fetchMock.mock('/api/404', 404);
    fetchMock.mock('/api/500', 500);
    
    fetcherFetch('/api/404');
    expect(fetchMock.calls().length).toBe(1);
    
    fetcherFetch('/api/500');
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('methods', () => {
    fetchMock.get('/api/get', 200);
    fetchMock.post('/api/post', 200);
    fetchMock.put('/api/put', 200);
    fetchMock.patch('/api/patch', 200);
    fetchMock.delete('/api/delete', 200);
    
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
    fetchMock.mock('/api/error', () => {
      throw new Error('Network ERROR');
    });
    
    expect(fetcherFetch('/api/error')).rejects.toThrowError('Network ERROR');
    expect(fetchMock.calls().length).toBe(1);
  });
  
  test('timeout', () => {
    fetchMock.mock('/api/timeout', () => new Promise(resolve => setTimeout(() => resolve('timeout result'), 250)));
    
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
    fetchMock.mock('/api/timeout-reject', () => new Promise((_, reject) => setTimeout(() => reject(new Error('Error after timeout')), 250)));
    
    expect(fetcherFetch('/api/timeout-reject', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
    expect(fetchMock.calls().length).toBe(1);
    
    expect(fetcherFetch('/api/timeout-reject').then(response => response.json())).rejects.toThrowError('Error after timeout');
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('abort', () => {
    fetchMock.mock('/api/abort', () => new Promise(resolve => setTimeout(() => resolve('abort result'), 20)));
    
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