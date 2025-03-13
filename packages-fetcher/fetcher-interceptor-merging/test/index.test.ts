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

import intercept from '../src';

const fetcher = createFetcher();

intercept(fetcher);

describe('fetcherInterceptorMerging', () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    delete (global as Record<string, unknown>).__fetcher_merging__;
    
    fetchMock.route('/api/one', () => ({
      result: 'hello one'
    }));
    
    fetchMock.route('/api/one?id=123', () => ({
      result: 'hello one 123'
    }));
    
    fetchMock.route('/api/error', () => {
      throw new Error('Api Error');
    });
  });
  
  test('merging is by default', async () => {
    expect((global as Record<string, unknown>).__fetcher_merging__).toBeFalsy();
    
    await Promise.all([
      fetcher.get('/api/one'),
      fetcher.get('/api/one'),
      fetcher.get('/api/one'),
      fetcher.get('/api/one', {
        id: 123
      })
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    await Promise.all([
      fetcher.get('/api/one'),
      fetcher.get('/api/one'),
      fetcher.get({
        merging: false
      }, '/api/one'),
      fetcher.get({
        merging: false
      }, '/api/one')
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(5);
    
    await Promise.all([
      fetcher.delete('/api/error'),
      fetcher.delete('/api/error'),
      fetcher.delete('/api/error')
    ]).catch(() => {
      // ignore
    });
    expect(fetchMock.callHistory.calls().length).toBe(6);
    
    expect((global as Record<string, unknown>).__fetcher_merging__).toBeTruthy();
  });
  
  test('no merging when with abort signal', async () => {
    const abortController = new AbortController();
    
    await Promise.all([
      fetcher.get('/api/one'),
      fetcher.get({
        signal: abortController.signal
      }, '/api/one'),
      fetcher.get('/api/one'),
      fetcher.get('/api/one'),
      fetcher.get('/api/one'),
      fetcher.get({
        signal: abortController.signal
      }, '/api/one')
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(3);
  });

  test('can be released', async () => {
    const myFetcher = createFetcher();
    const release = intercept(myFetcher);

    await Promise.all([
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one')
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(1);

    await myFetcher.get('/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(2);

    release();
    
    await Promise.all([
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one')
    ]);
    expect(fetchMock.callHistory.calls().length).toBe(5);
    await myFetcher.get('/api/one');
    expect(fetchMock.callHistory.calls().length).toBe(6);
  });
});
