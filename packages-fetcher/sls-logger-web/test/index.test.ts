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
  generateCreateLogger
} from '../src';

import {
  SILENT_TIME,
  WAIT_TIME,
  LOGGER_OPTIONS
} from './const';
import {
  sleep,
  getLastCallBody
} from './util';

const sls = createLogger(LOGGER_OPTIONS);

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    fetchMock.route('*', 200);
  });
  
  test('silent time, wait time & instant', async () => {
    sls('topic0');
    sls('topic1');
    sls('topic2');
    sls('topic3');
    expect(fetchMock.callHistory.calls().length).toBe(0); // above calls will not send before silent time up
    
    await sleep(SILENT_TIME / 2);
    expect(fetchMock.callHistory.calls().length).toBe(0); // still silent
    
    // 静默期间，instant 直接发送
    sls({
      instant: true
    }, 'topic-instant');
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    await sleep(SILENT_TIME / 2);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    expect(fetchMock.callHistory.lastCall()?.args[0]).toBe(`https://${LOGGER_OPTIONS.project}.${LOGGER_OPTIONS.endpoint}/logstores/${LOGGER_OPTIONS.logstore}/track`);
    expect(fetchMock.callHistory.lastCall()?.options.method).toBe('post');
    
    const body = getLastCallBody();
    
    expect(body.__topic__).toBe('SLS_MERGED');
    expect(body.__logs__.length).toBe(4);
    expect(body.__logs__[0]?._TOPIC).toBe('topic0');
    expect(body.__logs__[1]?._TOPIC).toBe('topic1');
    expect(body.__logs__[2]?._TOPIC).toBe('topic2');
    expect(body.__logs__[3]?._TOPIC).toBe('topic3');
    
    sls('topic-wait');
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    sls({
      instant: true
    }, 'topic-instant2');
    expect(fetchMock.callHistory.calls().length).toBe(3);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(4);
  });
  
  test('generateCreateLogger with factory dontSend', () => {
    const myCreateLogger = generateCreateLogger({
      dontSend: () => false
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