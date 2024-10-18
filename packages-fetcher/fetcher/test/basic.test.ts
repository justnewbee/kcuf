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

import fetcher from '../src';

import {
  API_GET,
  API_POST,
  API_PUT,
  API_PATCH,
  API_DELETE,
  API_CORS,
  API_CORS2
} from './const';
import {
  setupFetchMock
} from './util';

describe('basic', () => {
  beforeEach(setupFetchMock);
  
  test('await to get fetchMock stats', async () => {
    // ⛱️ 不是 BUG
    // fetcher 对拦截器进行了异步处理，因而 fetch 的调用也异步，调用 fetcher 后，无法立即反应到 `fetchMock`，故此，对 fetchMock
    // 的状态判断都需要先对 await fetcher
    await Promise.all([
      fetcher.get(API_GET.url),
      fetcher.post(API_POST.url),
      fetcher.put(API_PUT.url),
      fetcher.patch(API_PATCH.url),
      fetcher.delete(API_DELETE.url)
    ]);
    
    expect(fetchMock.calls().length).toBe(5);
  });
  
  test('cors', async () => {
    await fetcher.get(API_CORS.url);
    
    expect(fetchMock.calls().length).toBe(1);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
    
    await fetcher.get(API_CORS2.url);
    
    expect(fetchMock.calls().length).toBe(2);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
  });
});