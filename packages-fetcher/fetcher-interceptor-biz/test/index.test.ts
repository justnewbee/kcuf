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
  });
  
  test('fetcherFetch 200', () => {
    fetchMock.mock('*', () => 'fuck you');
    
    fetcher.get('/api-1');
    fetcher.post('/api-2');
    fetcher.delete('/api-3');
    fetcher.put('/api-4');
    
    expect(fetchMock.calls().length).toBe(4);
  });
});