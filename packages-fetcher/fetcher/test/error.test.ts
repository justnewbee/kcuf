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
  APIS
} from './const';
import {
  setupFetchMock
} from './util';

describe('fetcher error', () => {
  beforeEach(setupFetchMock);
  
  test('status 200-299 ok, no data', () => {
    expect(fetcher.get(APIS.STATUS_200)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.post(APIS.STATUS_201)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.put(APIS.STATUS_255)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
    expect(fetcher.delete(APIS.STATUS_299)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_PARSE);
  });
  
  test('response status NOT 200', () => {
    expect(fetcher.get(APIS.STATUS_300)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
    expect(fetcher.get(APIS.STATUS_404)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
    expect(fetcher.post(APIS.STATUS_500)).rejects.toHaveProperty('name', FetcherErrorName.RESPONSE_STATUS);
  });
  
  test('timeout', () => {
    expect(fetcher.get({
      timeout: 100
    }, APIS.TIMEOUT)).rejects.toHaveProperty('name', FetcherErrorName.TIMEOUT);
  });
  
  test('abort', () => {
    const abortController = new AbortController();
    const promise = fetcher.post({
      signal: abortController.signal
    }, APIS.ABORT);
    
    expect(promise).rejects.toThrowError('The operation was aborted.');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    
    abortController.abort();
  });
});