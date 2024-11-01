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
import {
  SlsPostBody
} from '@kcuf/sls-logger-web';

import pkgInfo from '../package.json';
import intercept from '../src';

import {
  INTERCEPTOR_OPTIONS,
  SLS_SILENT_TIME,
  SLS_WAIT_TIME
} from './const';

const fetcher = createFetcher();

intercept(fetcher, INTERCEPTOR_OPTIONS);

function sleep(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

function getLastCallBody(): SlsPostBody {
  return JSON.parse(fetchMock.lastCall()?.[1]?.body as string || '');
}

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.mock('/api/success', () => ({
      success: true,
      code: 200,
      data: {
        page: 1,
        pageSize: 2,
        total: 123,
        items: [{
          id: '1',
          name: 'name1'
        }, {
          id: '2',
          name: 'name2'
        }]
      }
    }));
    fetchMock.mock('/api/fail-404', 404);
    fetchMock.post(`https://${INTERCEPTOR_OPTIONS.project}.${INTERCEPTOR_OPTIONS.endpoint}/logstores/${INTERCEPTOR_OPTIONS.logstore}/track`, 200);
  });
  
  test('success', async () => {
    await sleep(SLS_SILENT_TIME);
    await fetcher.get('/api/success');
    await sleep(SLS_WAIT_TIME);
    
    expect(fetchMock.calls().length).toBe(2);
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('fetcher_success');
    expect(body.__logs__[0]?._TOPIC).toBe('fetcher_success');
    expect(body.__logs__[0]?._GROUP).toBe('LOG');
    expect(body.__logs__[0]?.['response.data']).toBeTypeOf('string');
    expect(Number(body.__logs__[0]?.duration)).toBeGreaterThan(0);
  });
  
  test('fail', async () => {
    await sleep(SLS_SILENT_TIME);
    await fetcher.get('/api/fail-404').catch(() => {
      // do nothing
    });
    await sleep(SLS_WAIT_TIME);
    
    expect(fetchMock.calls().length).toBe(2);
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('fetcher_error');
    expect(body.__logs__[0]?._TOPIC).toBe('fetcher_error');
    expect(body.__logs__[0]?._GROUP).toBe('ERROR');
    expect(body.__logs__[0]?.['error.name']).toBe('FetcherError.ResponseStatus');
    expect(body.__logs__[0]?.['error.message']).toBe('Response status 404.');
    expect(body.__logs__[0]?.['error.code']).toBe('404');
    expect(Number(body.__logs__[0]?.duration)).toBeGreaterThan(0);
  });
  
  test('custom topic & default params', async () => {
    await sleep(SLS_SILENT_TIME);
    
    const myFetcher = createFetcher();
    
    intercept(myFetcher, {
      ...INTERCEPTOR_OPTIONS,
      defaultParams: () => ({
        UA: navigator.userAgent
      }),
      topicSuccess: 'my_fetcher_success',
      topicError: 'my_fetcher_error'
    });
    
    await myFetcher.get('/api/success');
    await sleep(SLS_WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2);
    
    let body = getLastCallBody();
    
    expect(body.__topic__).toBe('my_fetcher_success');
    expect(body.__logs__[0]?._TOPIC).toBe('my_fetcher_success');
    expect(body.__logs__[0]?._GROUP).toBe('LOG');
    expect(body.__logs__[0]?.UA).toBeTypeOf('string');
    
    await myFetcher.get('/api/fail-404').catch(() => {
      // do nothing
    });
    await sleep(SLS_WAIT_TIME);
    expect(fetchMock.calls().length).toBe(4);
    
    body = getLastCallBody();
    expect(body.__topic__).toBe('my_fetcher_error');
    expect(body.__logs__[0]?._TOPIC).toBe('my_fetcher_error');
    expect(body.__logs__[0]?._GROUP).toBe('ERROR');
    expect(body.__logs__[0]?.UA).toBeTypeOf('string');
  });
});