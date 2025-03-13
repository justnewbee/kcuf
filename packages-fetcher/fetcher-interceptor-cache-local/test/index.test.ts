/**
 * @vitest-environment jsdom
 */
import _noop from 'lodash/noop';
import _isEmpty from 'lodash/isEmpty';
import {
  describe,
  expect,
  test,
  beforeEach
} from 'vitest';
import fetchMock from 'fetch-mock';

import {
  createFetcher
} from '@kcuf/fetcher';

import intercept from '../src';

const fetcher = createFetcher();

intercept(fetcher);

describe('fetcherInterceptorCacheLocal', () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    delete (global as Record<string, unknown>).__fetcher_cache_local__;
    
    fetchMock.route('/api/one', () => ({
      result: 'hello one'
    }));
    
    fetchMock.route('/api/another', () => ({
      result: 'hello another'
    }));
    
    fetchMock.route('/api/one?id=123', () => ({
      result: 'hello one 123'
    }));
    
    fetchMock.route('/api/error', () => {
      throw new Error('Api Error');
    });
  });
  
  test('will not invoke fetch, but will resolve', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    expect(await fetcher.get('/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    expect(await fetcher.get({
      cacheLocal: true
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect(await fetcher.get({
      cacheLocal: true
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect(await fetcher.get({
      cacheLocal: true
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect(await fetcher.get({
      cacheLocal: true
    }, '/api/one', {
      id: 123
    })).toEqual({
      result: 'hello one 123'
    });
    expect(fetchMock.callHistory.calls().length).toBe(3);
    
    expect(await fetcher.post({
      cacheLocal: true
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(4);
    
    expect(await fetcher.post({
      cacheLocal: true
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(4);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('simultaneous same fetches will only fetch once', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await Promise.all([
      fetcher.get({
        cacheLocal: true
      }, '/api/one'),
      fetcher.get({
        cacheLocal: true
      }, '/api/one'),
      fetcher.get({
        cacheLocal: true
      }, '/api/one'),
      fetcher.get({
        cacheLocal: true
      }, '/api/one')
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await Promise.all([
      fetcher.delete({
        cacheLocal: true
      }, '/api/error'),
      fetcher.delete({
        cacheLocal: true
      }, '/api/error'),
      fetcher.delete({
        cacheLocal: true
      }, '/api/error')
    ]).catch(_noop);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('options.cacheLocal.key', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('options.cacheLocal.ttl', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    // 没有 ttl 一定被顶替
    await fetcher.get({
      cacheLocal: {
        ttl: 50
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    await fetcher.get({
      cacheLocal: {
        ttl: 50
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    await new Promise(resolve => {
      setTimeout(resolve, 36);
    });
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(3);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('options.cacheLocal.overwrite', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: {
        overwrite: true
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    await fetcher.get({
      cacheLocal: {
        ttl: 50
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(3);
    
    await fetcher.get({
      cacheLocal: {
        ttl: 50,
        overwrite: true
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(4);
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(4);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('options.cacheLocalRemove', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      }
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      },
      cacheLocalRemove: 'shall not remove anything'
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocalRemove: 'custom-cache-local-key'
    }, '/api/another');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect(await fetcher.get({
      cacheLocal: {
        key: 'custom-cache-local-key'
      }
    }, '/api/one')).toEqual({
      result: 'hello one'
    });
    expect(fetchMock.callHistory.calls().length).toBe(3);
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(4);
    
    await fetcher.get({
      cacheLocalRemove: '/api/one'
    }, '/api/another');
    expect(fetchMock.callHistory.calls().length).toBe(5);
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(6);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeTruthy();
  });
  
  test('no cache local by default', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get('/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get('/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
  });
  
  test('error calls will not cache', async () => {
    expect((global as Record<string, unknown>).__fetcher_cache_local__).toBeFalsy();
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/error').catch(_noop);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await fetcher.get({
      cacheLocal: true
    }, '/api/error').catch(_noop);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    expect(_isEmpty((global as Record<string, unknown>).__fetcher_cache_local__)).toBeTruthy(); // TODO 最好可以不设对象（但也无妨）
  });
  
  test('can be released', async () => {
    const myFetcher = createFetcher();
    const release = intercept(myFetcher);
    
    await myFetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await myFetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    release();
    
    await myFetcher.get({
      cacheLocal: true
    }, '/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);
  });
});
