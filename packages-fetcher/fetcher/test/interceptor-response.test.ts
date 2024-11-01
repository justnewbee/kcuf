/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach
} from 'vitest';

import fetcher, {
  FetcherErrorName,
  createFetcher
} from '../src';

import {
  API_POST,
  API_STATUS_404
} from './const';
import {
  setupFetchMock
} from './util';

describe('interceptor response', () => {
  beforeEach(setupFetchMock);
  
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