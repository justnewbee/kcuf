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
  FetcherConfig,
  createFetcher,
  createFetcherErrorSkipNetwork
} from '../src';

import {
  API_POST
} from './const';
import {
  setupFetchMock
} from './util';

describe('interceptor request', () => {
  beforeEach(setupFetchMock);
  
  test('interceptor request', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest(() => ({
      body: {
        addedByInterceptor: true
      }
    }));
    
    await myFetcher.post(API_POST.url);
    expect(fetchMock.callHistory.lastCall()?.options.body).toEqual('addedByInterceptor=true');
    
    // body will merge 1
    await myFetcher.post(API_POST.url, {
      whenCall: 123
    });
    expect(fetchMock.callHistory.lastCall()?.options.body).toEqual('addedByInterceptor=true&whenCall=123');
    
    // body will merge 2
    await myFetcher.post(API_POST.url, 'whenCall=strMode');
    expect(fetchMock.callHistory.lastCall()?.options.body).toEqual('addedByInterceptor=true&whenCall=strMode');
    
    // eject the interceptor
    eject();
    
    await myFetcher.post(API_POST.url, {
      noInterceptorNow: true
    });
    expect(fetchMock.callHistory.lastCall()?.options.body).toEqual('noInterceptorNow=true');
  });
  
  test('interceptor request - skip network', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest((config: FetcherConfig): never => {
      throw createFetcherErrorSkipNetwork('no request was made', config);
    });
    
    const result = await myFetcher.post(API_POST.url);
    
    expect(result).toBe('no request was made');
    expect(fetchMock.callHistory.calls().length).toBe(0);
    
    eject();
    expect(myFetcher.post(API_POST.url)).resolves.toEqual(API_POST.result);
  });
});