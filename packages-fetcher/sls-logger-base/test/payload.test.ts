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
  WAIT_TIME
} from './const';
import {
  setupFetchMock,
  sleep,
  sls,
  getLastCallBody
} from './util';

describe('payload', () => {
  beforeEach(setupFetchMock);
  
  test('payload is plain object, all fields will be string', async () => {
    await sleep(SILENT_TIME);
    
    const payload: Record<string, unknown> = {
      a: 1234,
      b: {
        bb: 1
      },
      c: [1, false, {
        k1: 'v1',
        k2: 'v2'
      }],
      d: true,
      e: false,
      f: 'fff'
    };
    
    sls('topic-payload-plain', payload);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?.__topic__).toBe('topic-payload-plain');
    expect(body.__logs__[0]?.a).toBe('1234');
    expect(body.__logs__[0]?.b).toBe('{"bb":1}');
    expect(body.__logs__[0]?.c).toBe('[1,false,{"k1":"v1","k2":"v2"}]');
    expect(body.__logs__[0]?.d).toBe('true');
    expect(body.__logs__[0]?.e).toBe('false');
    expect(body.__logs__[0]?.f).toBe('fff');
  });
  
  test('payload cyclic shall not throw', async () => {
    await sleep(SILENT_TIME);
    
    const payload: Record<string, unknown> = {
      a: 1234
    };
    
    payload.p = payload;
    
    sls('topic-payload-cyclic', payload);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?.__topic__).toBe('topic-payload-cyclic');
    expect(body.__logs__[0]?.a).toBe('1234');
    expect(body.__logs__[0]?.p).toBe('TypeError: cyclic object value');
  });
  
  test('payload has empty fields will be omitted', async () => {
    sls('topic-empty', {
      a: 'aa',
      b: null,
      c: '',
      d: undefined,
      z: 0
    });
    
    await sleep(SILENT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?.__topic__).toBe('topic-empty');
    expect(body.__logs__[0]?.a).toBe('aa');
    expect(body.__logs__[0]?.b).toBeUndefined();
    expect(body.__logs__[0]?.c).toBeUndefined();
    expect(body.__logs__[0]?.d).toBeUndefined();
    expect(body.__logs__[0]?.z).toBe('0');
  });
  
  test('payload normalize error', async () => {
    await sleep(SILENT_TIME);
    
    const error = new Error('Error message');
    
    (error as unknown as Record<string, unknown>).code = 123456;
    (error as unknown as Record<string, unknown>).loggedIn = true;
    (error as unknown as Record<string, unknown>).details = {
      info: 'some info',
      reason: 'some reason',
      doc: 'some doc'
    };
    
    sls('topic-error', error);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-error');
    expect(body.__logs__[0]?.name).toBe('Error');
    expect(body.__logs__[0]?.message).toBe('Error message');
    expect(body.__logs__[0]?.code).toBe('123456');
    expect(body.__logs__[0]?.loggedIn).toBe('true');
    expect(body.__logs__[0]?.details).toBe('{"info":"some info","reason":"some reason","doc":"some doc"}');
  });
  
  test('payload normalize FormData', async () => {
    await sleep(SILENT_TIME);
    
    const file = new File(['the file name.avi'], 'the file name.avi');
    
    sls('topic-file', file);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-file');
    expect(body.__logs__[0]?.name).toBe('the file name.avi');
    expect(Number(body.__logs__[0]?.size)).toBeTypeOf('number');
  });
  
  test('payload normalize FormData', async () => {
    await sleep(SILENT_TIME);
    
    const formData = new FormData();
    
    formData.append('a', '1');
    formData.append('b', 'b1');
    formData.append('b', 'b2');
    
    sls('topic-form-data', formData);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-form-data');
    expect(body.__logs__[0]?.a).toBe('1');
    expect(body.__logs__[0]?.b).toEqual('["b1","b2"]');
  });
  
  test('payload normalize Header', async () => {
    await sleep(SILENT_TIME);
    
    const headers = new Headers();
    
    headers.append('a', '1');
    headers.append('b', 'b1');
    headers.append('b', 'b2');
    
    sls('topic-headers', headers);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-headers');
    expect(body.__logs__[0]?.a).toBe('1');
    expect(body.__logs__[0]?.b).toEqual('b1, b2');
  });
  
  test('payload normalize URLSearchParams', async () => {
    await sleep(SILENT_TIME);
    
    const searchParams = new URLSearchParams();
    
    searchParams.append('a', '1');
    searchParams.append('b', 'b1');
    searchParams.append('b', 'b2');
    
    sls('topic-search-params', searchParams);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-search-params');
    expect(body.__logs__[0]?.a).toBe('1');
    expect(body.__logs__[0]?.b).toEqual('["b1","b2"]');
  });
});