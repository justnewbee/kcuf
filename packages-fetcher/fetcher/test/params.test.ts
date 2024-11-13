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
  API_GET_WITH_PARAMS
} from './const';
import {
  setupFetchMock
} from './util';

describe('parse params', () => {
  beforeEach(setupFetchMock);
  
  test('params parse', async () => {
    expect(await fetcher.get(API_GET_WITH_PARAMS.url, {
      id: 1234,
      arr: [1, 2, 3]
    })).toEqual(API_GET_WITH_PARAMS.result);
    
    expect(fetchMock.callHistory.lastCall()?.args[0]).toEqual(`${API_GET_WITH_PARAMS.url}?id=1234&arr=1&arr=2&arr=3`);
  });
});
