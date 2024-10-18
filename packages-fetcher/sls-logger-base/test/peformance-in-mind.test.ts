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

import createLogger from '../src';

import {
  SILENT_TIME,
  WAIT_TIME,
  MAX_CHUNK,
  LOGGER_OPTIONS
} from './const';
import {
  setupFetchMock,
  sleep,
  sender,
  getLastCallBody
} from './util';

const sls = createLogger(sender, LOGGER_OPTIONS);

describe('performance in mind', () => {
  beforeEach(setupFetchMock);
  
  test('silent time, wait time & instant', async () => {
    sls('topic0');
    sls('topic1');
    sls('topic2');
    sls('topic3');
    expect(fetchMock.calls().length).toBe(0); // above calls will not send before silent time up
    
    await sleep(SILENT_TIME / 2);
    expect(fetchMock.calls().length).toBe(0); // still silent
    
    // 静默期间，instant 直接发送
    sls({
      instant: true
    }, 'topic-instant');
    expect(fetchMock.calls().length).toBe(1);
    
    await sleep(SILENT_TIME / 2);
    expect(fetchMock.calls().length).toBe(2);
    expect(fetchMock.lastCall()?.[0]).toBe(`https://${LOGGER_OPTIONS.project}.${LOGGER_OPTIONS.endpoint}/logstores/${LOGGER_OPTIONS.logstore}/track`);
    expect(fetchMock.lastCall()?.[1]?.method).toBe('POST');
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('SLS_MERGED');
    expect(body.__logs__.length).toBe(4);
    expect(body.__logs__[0]?._TOPIC).toBe('topic0');
    expect(body.__logs__[1]?._TOPIC).toBe('topic1');
    expect(body.__logs__[2]?._TOPIC).toBe('topic2');
    expect(body.__logs__[3]?._TOPIC).toBe('topic3');
    
    sls('topic-wait');
    expect(fetchMock.calls().length).toBe(2);
    
    sls({
      instant: true
    }, 'topic-instant2');
    expect(fetchMock.calls().length).toBe(3);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(4);
  });
  
  test('once true', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      once: true
    }, 'topic-once');
    sls({
      once: true
    }, 'topic-once');
    sls({
      once: true
    }, 'topic-once');
    sls('topic-once'); // same topic but not once will always send
    expect(fetchMock.calls().length).toBe(0);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('SLS_MERGED');
    expect(body.__logs__.length).toBe(2);
    expect(body.__logs__[0]?._TOPIC).toBe('topic-once');
    expect(body.__logs__[1]?._TOPIC).toBe('topic-once');
  });
  
  test('once key', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      once: 'custom-key-1'
    }, 'topic-once');
    sls({
      once: 'custom-key-1'
    }, 'topic-once');
    sls({
      once: 'custom-key-2'
    }, 'topic-once');
    sls({
      once: 'custom-key-2'
    }, 'topic-once');
    expect(fetchMock.calls().length).toBe(0);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('SLS_MERGED');
    expect(body.__logs__.length).toBe(2);
    expect(body.__logs__[0]?._TOPIC).toBe('topic-once');
  });
  
  test('maxChunk', async () => {
    await sleep(SILENT_TIME);
    
    for (let i = 0; i <= MAX_CHUNK * 1.5; i++) {
      sls('topic-max-batch', {
        num: i
      });
    }
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2); // 分了两波
    
    const body = getLastCallBody();
    
    expect(body.__logs__[body.__logs__.length - 1]?._TOPIC).toBe('topic-max-batch');
    expect(body.__logs__[body.__logs__.length - 1]?.num).toBe(String(MAX_CHUNK * 1.5));
  });
});