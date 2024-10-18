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

import fetcher, {
  FetcherErrorName,
  FetcherConfig,
  createFetcher,
  createFetcherErrorSkipNetwork
} from '../src';

import {
  API_POST,
  API_STATUS_404
} from './const';
import {
  setupFetchMock
} from './util';

describe('fetcher interceptor', () => {
  beforeEach(setupFetchMock);
  
  test('interceptor request', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest(() => ({
      body: {
        addedByInterceptor: true
      }
    }));
    
    await myFetcher.post(API_POST.url);
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('addedByInterceptor=true');
    
    // body will merge 1
    await myFetcher.post(API_POST.url, {
      whenCall: 123
    });
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('whenCall=123&addedByInterceptor=true');
    
    // body will merge 2
    await myFetcher.post(API_POST.url, 'whenCall=strMode');
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('whenCall=strMode&addedByInterceptor=true');
    
    // eject the interceptor
    eject();
    
    await myFetcher.post(API_POST.url, {
      noInterceptorNow: true
    });
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('noInterceptorNow=true');
  });
  
  test('interceptor request - skip network', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest((config: FetcherConfig): never => {
      throw createFetcherErrorSkipNetwork('no request was made', config);
    });
    
    const result = await myFetcher.post(API_POST.url);
    
    expect(result).toBe('no request was made');
    expect(fetchMock.calls().length).toBe(0);
    
    eject();
    expect(myFetcher.post(API_POST.url)).resolves.toEqual(API_POST.result);
  });
  
  test('interceptor response onFulfilled', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptResponse(() => {
      return 'response altered';
    });
    
    expect(await myFetcher.post(API_POST.url)).toBe('response altered');
    
    eject();
    expect(myFetcher.post(API_POST.url)).resolves.toEqual(API_POST.result);
  });
  
  test('interceptor response onRejected', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptResponse(undefined, () => new Promise(resolve => {
      setTimeout(() => resolve('response corrected'), 200);
    }));
    
    expect(await myFetcher.post(API_STATUS_404.url)).toBe('response corrected');
    
    eject();
    expect(fetcher.get(API_STATUS_404.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
  });
});