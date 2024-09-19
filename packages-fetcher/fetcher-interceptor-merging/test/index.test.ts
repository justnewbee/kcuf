/**
 * @vitest-environment jsdom
 */
import _noop from 'lodash/noop';
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
    delete (global as Record<string, unknown>).__fetcher_merging__;
    
    fetchMock.mock('/api/one', () => ({
      result: 'hello one'
    }));
    
    fetchMock.mock('/api/one?id=123', () => ({
      result: 'hello one 123'
    }));
    
    fetchMock.mock('/api/error', () => {
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
    expect(fetchMock.calls().length).toBe(2);
    
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
    expect(fetchMock.calls().length).toBe(5);
    
    await Promise.all([
      fetcher.delete('/api/error'),
      fetcher.delete('/api/error'),
      fetcher.delete('/api/error')
    ]).catch(_noop);
    expect(fetchMock.calls().length).toBe(6);
    
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
    expect(fetchMock.calls().length).toBe(3);
  });

  test('can be released', async () => {
    const myFetcher = createFetcher();
    const release = intercept(myFetcher);

    await Promise.all([
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one')
    ]);
    expect(fetchMock.calls().length).toBe(1);

    await myFetcher.get('/api/one');
    expect(fetchMock.calls().length).toBe(2);

    release();
    
    await Promise.all([
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one'),
      myFetcher.get('/api/one')
    ]);
    expect(fetchMock.calls().length).toBe(5);
    await myFetcher.get('/api/one');
    expect(fetchMock.calls().length).toBe(6);
  });
});