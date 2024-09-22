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
import intercept, {
  FetcherInterceptorSlsOptions
} from '../src';

const fetcher = createFetcher();

// 为了不消耗太多测试时间，调整默认值
const SILENT_TIME = 160;
const WAIT_TIME = 100;

const OPTIONS = {
  endpoint: 'test-endpoint.sls-aliyuncs.com',
  project: 'test-project',
  logstore: 'test-logstore',
  silentTime: SILENT_TIME,
  waitTime: WAIT_TIME
} satisfies FetcherInterceptorSlsOptions;

intercept(fetcher, OPTIONS);

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
      success: true
    }));
    fetchMock.mock('/api/fail-404', 404);
    fetchMock.post(`https://${OPTIONS.project}.${OPTIONS.endpoint}/logstores/${OPTIONS.logstore}/track`, 200);
  });
  
  test('success', async () => {
    await sleep(SILENT_TIME);
    await fetcher.get('/api/success');
    await sleep(WAIT_TIME);
    
    expect(fetchMock.calls().length).toBe(2);
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('fetcher_success');
    expect(body.__logs__[0]?._TOPIC).toBe('fetcher_success');
    expect(body.__logs__[0]?._GROUP).toBe('LOG');
    expect(body.__logs__[0]?.['response.data.success']).toBe('true');
    expect(Number(body.__logs__[0]?.duration)).toBeGreaterThan(0);
  });
  
  test('fail', async () => {
    await sleep(SILENT_TIME);
    await fetcher.get('/api/fail-404').catch(() => {
      // do nothing
    });
    await sleep(WAIT_TIME);
    
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
    await sleep(SILENT_TIME);
    
    const myFetcher = createFetcher();
    
    intercept(myFetcher, {
      ...OPTIONS,
      defaultParams: () => ({
        UA: navigator.userAgent
      }),
      topicSuccess: 'my_fetcher_success',
      topicError: 'my_fetcher_error'
    });
    
    await myFetcher.get('/api/success');
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2);
    
    let body = getLastCallBody();
    
    expect(body.__topic__).toBe('my_fetcher_success');
    expect(body.__logs__[0]?._TOPIC).toBe('my_fetcher_success');
    expect(body.__logs__[0]?._GROUP).toBe('LOG');
    expect(body.__logs__[0]?.UA).toBeTypeOf('string');
    
    await myFetcher.get('/api/fail-404').catch(() => {
      // do nothing
    });
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(4);
    
    body = getLastCallBody();
    expect(body.__topic__).toBe('my_fetcher_error');
    expect(body.__logs__[0]?._TOPIC).toBe('my_fetcher_error');
    expect(body.__logs__[0]?._GROUP).toBe('ERROR');
    expect(body.__logs__[0]?.UA).toBeTypeOf('string');
  });
});