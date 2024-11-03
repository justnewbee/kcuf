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
} from '../src';

import {
  API_POST
} from './const';
import {
  setupFetchMock
} from './util';

describe('merge headers', () => {
  beforeEach(setupFetchMock);
  
  test('interceptor request headers will be merged', async () => {
    const myFetcher = createFetcher();
    
    myFetcher.interceptRequest(() => ({
      headers: {
        hello: 'world'
      }
    }));
    myFetcher.interceptRequest(() => ({
      headers: {
        hello2: 'world2'
      }
    }));
    
    await myFetcher.post(API_POST.url);
    
    expect(fetchMock.callHistory.calls().length).toBe(1);
    expect(new Headers(fetchMock.callHistory.lastCall()?.options.headers).get('Hello')).toBe('world');
    expect(new Headers(fetchMock.callHistory.lastCall()?.options.headers).get('Hello2')).toBe('world2');
  });
});