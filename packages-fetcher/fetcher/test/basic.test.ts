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
import fetcher from '../src';

import {
  APIS
} from './const';
import {
  setupFetchMock
} from './util';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(setupFetchMock);
  
  test('await to get fetchMock stats', async () => {
    // ⛱️ 不是 BUG
    // fetcher 对拦截器进行了异步处理，因而 fetch 的调用也异步，调用 fetcher 后，无法立即反应到 `fetchMock`，故此，对 fetchMock
    // 的状态判断都需要先对 await fetcher
    await Promise.all([
      fetcher.get(APIS.GET),
      fetcher.post(APIS.POST),
      fetcher.put(APIS.PUT),
      fetcher.patch(APIS.PATCH),
      fetcher.delete(APIS.DELETE)
    ]);
    
    expect(fetchMock.calls().length).toBe(5);
  });
  
  test('cors', async () => {
    await fetcher.get(APIS.CORS);
    
    expect(fetchMock.calls().length).toBe(1);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
    
    await fetcher.get(APIS.CORS2);
    
    expect(fetchMock.calls().length).toBe(2);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
  });
});