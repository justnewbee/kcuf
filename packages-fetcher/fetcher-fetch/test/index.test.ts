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

import fetcherFetch, {
  FetchErrorName
} from '../src';

describe('fetcherFetch', () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    fetchMock.get('/api/any', 200);
    fetchMock.get('/api/get', 200);
    fetchMock.post('/api/post', 200);
    fetchMock.put('/api/put', 200);
    fetchMock.patch('/api/patch', 200);
    fetchMock.delete('/api/delete', 200);
    
    fetchMock.route('/api/404', 404);
    fetchMock.route('/api/500', 500);
    fetchMock.route('/api/error', () => {
      throw new Error('Network ERROR');
    });
    fetchMock.route('/api/timeout', () => new Promise(resolve => {
      setTimeout(() => resolve('timeout result'), 250);
    }));
    fetchMock.route('/api/timeout-reject', () => new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Error after timeout')), 250);
    }));
    fetchMock.route('/api/abort', () => new Promise(resolve => {
      setTimeout(() => resolve('abort result'), 20);
    }));
  });
  
  test('response status 200', () => {
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    fetcherFetch('/api/any');
    
    expect(fetchMock.callHistory.calls().length).toBe(4);
  });

  test('response status NOT 200 is treated as success here', async () => {
    await expect(fetcherFetch('/api/404')).resolves.toHaveProperty('status', 404);
    await expect(fetcherFetch('/api/500')).resolves.toHaveProperty('status', 500);
  });

  test('methods', () => {
    fetcherFetch('/api/get');
    expect(fetchMock.callHistory.called('/api/get')).toBe(true);

    fetcherFetch('/api/get', {
      method: 'GET'
    });
    expect(fetchMock.callHistory.called('/api/get')).toBe(true);

    fetcherFetch('/api/post', {
      method: 'POST'
    });
    expect(fetchMock.callHistory.called('/api/post')).toBe(true);

    fetcherFetch('/api/put', {
      method: 'PUT'
    });
    expect(fetchMock.callHistory.called('/api/put')).toBe(true);

    fetcherFetch('/api/patch', {
      method: 'PATCH'
    });
    expect(fetchMock.callHistory.called('/api/patch')).toBe(true);

    fetcherFetch('/api/delete', {
      method: 'DELETE'
    });
    expect(fetchMock.callHistory.called('/api/delete')).toBe(true);

    expect(fetchMock.callHistory.calls().length).toBe(6);
  });

  test('error', async () => {
    await expect(fetcherFetch('/api/error')).rejects.toThrow('Network ERROR');
    expect(fetchMock.callHistory.calls().length).toBe(1);
  });

  test('timeout', async () => {
    await expect(fetcherFetch('/api/timeout', {
      timeout: 100
    })).rejects.toThrow('fetcher-fetch timeout, url = /api/timeout, timeout = 100ms');
    await expect(fetcherFetch('/api/timeout', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
    await expect(fetcherFetch('/api/timeout').then(response => response.text())).resolves.toEqual('timeout result');
    await expect(fetcherFetch('/api/timeout').then(response => response.json())).rejects.toThrow(); // 返回的不是 JSON
  });

  test('timeout II - rejected', async () => {
    await expect(fetcherFetch('/api/timeout-reject', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
    await expect(fetcherFetch('/api/timeout-reject', {
      timeout: 100
    })).rejects.toHaveProperty('name', FetchErrorName.TIMEOUT);
  });

  test('abort', async () => {
    const abortController = new AbortController();
    const promise = fetcherFetch('/api/abort', {
      signal: abortController.signal
    });

    abortController.abort();

    await expect(promise).rejects.toThrow('The operation was aborted.');
    await expect(promise).rejects.toHaveProperty('name', 'AbortError');
    expect(fetchMock.callHistory.calls().length).toBe(1);
  });
});
