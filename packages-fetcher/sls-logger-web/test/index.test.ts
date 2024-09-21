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

import pkgInfo from '../package.json';
import createLogger, {
  CreateLoggerOptions,
  SlsPostBody,
  generateCreateLogger
} from '../src';

function sleep(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

// 为了不消耗太多测试时间，调整默认值
const SILENT_TIME = 160;
const WAIT_TIME = 100;
const MAX_CHUNK = 10;
const LOGGER_OPTIONS: CreateLoggerOptions = {
  endpoint: 'test-endpoint.sls-aliyuncs.com',
  project: 'test-project',
  logstore: 'test-logstore',
  silentTime: SILENT_TIME,
  waitTime: WAIT_TIME,
  maxChunk: MAX_CHUNK
};

const sls = createLogger(LOGGER_OPTIONS);

function getLastCallBody(): SlsPostBody {
  return JSON.parse(fetchMock.lastCall()?.[1]?.body as string || '');
}

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.mock('*', 200);
  });
  
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
  
  test('generateCreateLogger', () => {
    const myCreateLogger = generateCreateLogger({
      shouldIgnore: () => false
    });
    const mySls = myCreateLogger(LOGGER_OPTIONS);
    
    expect(mySls).toBeTypeOf('function');
    expect(mySls.debug).toBeTypeOf('function');
    expect(mySls.log).toBeTypeOf('function');
    expect(mySls.info).toBeTypeOf('function');
    expect(mySls.warn).toBeTypeOf('function');
    expect(mySls.error).toBeTypeOf('function');
    expect(mySls.fatal).toBeTypeOf('function');
  });
});