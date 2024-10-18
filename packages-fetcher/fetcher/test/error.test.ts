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
  FetcherErrorName
} from '../src';

import {
  API_STATUS_200,
  API_STATUS_201,
  API_STATUS_255,
  API_STATUS_299,
  API_STATUS_300,
  API_STATUS_404,
  API_STATUS_500,
  API_ABORT,
  API_TIMEOUT
} from './const';
import {
  setupFetchMock
} from './util';

describe('fetcher error', () => {
  beforeEach(setupFetchMock);
  
  test('status 200-299 ok, no data', () => {
    expect(fetcher.get(API_STATUS_200.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.post(API_STATUS_201.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.put(API_STATUS_255.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.delete(API_STATUS_299.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
  });
  
  test('response status NOT 200', () => {
    expect(fetcher.get(API_STATUS_300.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
    expect(fetcher.get(API_STATUS_404.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
    expect(fetcher.post(API_STATUS_500.url)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
  });
  
  test('timeout', () => {
    expect(fetcher.get({
      timeout: 100
    }, API_TIMEOUT.url)).rejects.toHaveProperty('name', FetcherErrorName.TIMEOUT);
  });
  
  test('abort', () => {
    const abortController = new AbortController();
    const promise = fetcher.post({
      signal: abortController.signal
    }, API_ABORT.url);
    
    expect(promise).rejects.toThrowError('The operation was aborted.');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    
    abortController.abort();
  });
});