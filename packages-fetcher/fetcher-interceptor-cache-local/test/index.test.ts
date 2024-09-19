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

import {
  createFetcher
} from '@kcuf/fetcher';

import pkgInfo from '../package.json';
import intercept from '../src';

const fetcher = createFetcher();

intercept(fetcher);

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.mock('/api/any', () => ({
      result: 'hello any'
    }));
    
    fetchMock.mock('/api/any?id=123', () => ({
      result: 'hello any 123'
    }));
    
    fetchMock.mock('/api/error', () => {
      throw new Error('Api Error');
    });
  });
  
  test('no cache local by default', async () => {
    await fetcher.get('/api/any');
    await fetcher.get('/api/any');
    
    expect(fetchMock.calls().length).toBe(2);
  });
  
  test('cache local will not really call fetch, but will resolve', async () => {
    await fetcher.get('/api/any'); // no cache
    await fetcher.get({ // cache GET:/api/any +1
      cacheLocal: true
    }, '/api/any');
    await fetcher.get({ // cache GET:/api/any =1
      cacheLocal: true
    }, '/api/any');
    await fetcher.get({ // cache GET:/api/any =1
      cacheLocal: true
    }, '/api/any');
    await fetcher.get({ // cache GET:/api/any?id=123 +1
      cacheLocal: true
    }, '/api/any', {
      id: 123
    });
    
    await fetcher.post({ // cache POST:/api/any +1
      cacheLocal: true
    }, '/api/any');
    await fetcher.post({ // cache POST:/api/any =1
      cacheLocal: true
    }, '/api/any');
    
    expect(fetcher.get({
      cacheLocal: true
    }, '/api/any')).resolves.toEqual({
      result: 'hello any'
    });
    
    expect(fetchMock.calls().length).toBe(4);
  });
  
  test('error calls will not be cached', async () => {
    await fetcher.get({
      cacheLocal: true
    }, '/api/error').catch(() => {});

    await fetcher.get({
      cacheLocal: true
    }, '/api/error').catch();

    expect(fetchMock.calls().length).toBe(2);
  });
});