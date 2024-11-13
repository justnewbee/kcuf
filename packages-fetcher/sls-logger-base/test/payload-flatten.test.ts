/**
 * @vitest-environment jsdom
 */
import {
  beforeEach,
  describe,
  expect,
  test
} from 'vitest';
import fetchMock from 'fetch-mock';

import {
  SILENT_TIME,
  WAIT_TIME,
  PAYLOAD_FOR_FLATTEN
} from './const';
import {
  setupFetchMock,
  sleep,
  getLastCallBody,
  sls
} from './util';

describe('payload flatten', () => {
  beforeEach(setupFetchMock);
  
  test('payload flatten true', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: true
    }, 'topic-flatten-true', {
      error: new Error('Error message'),
      aa: 1234,
      right: true,
      wrong: false,
      fn() {
        console.info('all methods shall not be logged'); // eslint-disable-line no-console
      }
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-true');
    expect(body.__logs__[0]?.['error.name']).toBe('Error');
    expect(body.__logs__[0]?.['error.message']).toBe('Error message');
    expect(body.__logs__[0]?.aa).toBe('1234');
    expect(body.__logs__[0]?.right).toBe('true');
    expect(body.__logs__[0]?.wrong).toBe('false');
    expect(body.__logs__[0]?.fn).toBeUndefined();
  });
  
  test('payload flatten, payload is error', async () => {
    await sleep(SILENT_TIME);
    
    const error = new Error('Error message');
    
    (error as unknown as Record<string, unknown>).code = 123456;
    (error as unknown as Record<string, unknown>).loggedIn = true;
    (error as unknown as Record<string, unknown>).details = {
      info: 'some info',
      reason: 'some reason',
      doc: 'some doc'
    };
    
    sls({
      flatten: 'error'
    }, 'topic-error-flatten', error);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-error-flatten');
    expect(body.__logs__[0]?.['error.name']).toBe('Error');
    expect(body.__logs__[0]?.['error.message']).toBe('Error message');
    expect(body.__logs__[0]?.['error.code']).toBe('123456');
    expect(body.__logs__[0]?.['error.loggedIn']).toBe('true');
    expect(body.__logs__[0]?.['error.details.info']).toBe('some info');
    expect(body.__logs__[0]?.['error.details.reason']).toBe('some reason');
    expect(body.__logs__[0]?.['error.details.doc']).toBe('some doc');
  });
  
  test('payload flatten, prefix', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: 'error'
    }, 'topic-error-flatten', new Error('Error message'));
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-error-flatten');
    expect(body.__logs__[0]?.['error.name']).toBe('Error');
    expect(body.__logs__[0]?.['error.message']).toBe('Error message');
  });
  
  test('payload flatten, omit: string', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: {
        omit: 'response.data'
      }
    }, 'topic-flatten-omit-str', PAYLOAD_FOR_FLATTEN);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-omit-str');
    expect(body.__logs__[0]?._omitByDefault).toBeUndefined();
    expect(body.__logs__[0]?.['response.data']).toBeUndefined();
  });
  
  test('payload flatten, omit: regexp', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: {
        scope: 'what',
        omit: /iWillBeIgnored/
      }
    }, 'topic-flatten-omit-regexp', PAYLOAD_FOR_FLATTEN);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-omit-regexp');
    expect(body.__logs__[0]?.['what._omitByDefault']).toBeUndefined();
    expect(body.__logs__[0]?.['what.request.iWillBeIgnored']).toBeUndefined();
    expect(body.__logs__[0]?.['what.request.url']).toBe('url');
    expect(body.__logs__[0]?.['what.iWillBeIgnored']).toBeUndefined();
  });
  
  test('payload flatten, omit: array mixed', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: {
        scope: 'xx',
        omit: ['request.url', 'response.status', /ignored/i]
      }
    }, 'topic-flatten-omit-array-mixed', PAYLOAD_FOR_FLATTEN);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-omit-array-mixed');
    expect(body.__logs__[0]?.['xx._omitByDefault']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.iWillBeIgnored']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.url']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.status']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.iWillBeIgnored']).toBeUndefined();
  });
  
  test('payload flatten, depth & direct', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: {
        direct: 'response.data'
      }
    }, 'topic-flatten-direct', PAYLOAD_FOR_FLATTEN);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-direct');
    expect(body.__logs__[0]?.['request.url']).toBe('url');
    expect(body.__logs__[0]?.['response.status']).toBe('200');
    expect(body.__logs__[0]?.['response.data']).toBeTypeOf('string');
    expect(body.__logs__[0]?.['a.b.c.d.e']).toBe('{"f":{"g":"ABCDEFG"}}'); // default depth 5
  });
});
