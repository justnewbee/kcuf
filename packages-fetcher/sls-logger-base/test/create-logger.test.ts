/**
 * @vitest-environment jsdom
 */
import {
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';
import fetchMock from 'fetch-mock';

import createLogger from '../src';

import {
  SILENT_TIME,
  WAIT_TIME,
  LOGGER_OPTIONS
} from './const';
import {
  setupFetchMock,
  sleep,
  sender,
  getLastCallBody
} from './util';

describe('createLogger', () => {
  beforeEach(setupFetchMock);
  
  test('createLogger returned sls is a function with some quick functions attached', () => {
    const slsWithDefault = createLogger(sender, {
      endpoint: 'test-endpoint.sls-aliyuncs.com',
      project: 'test-project',
      logstore: 'test-logstore'
    });
    
    expect(slsWithDefault).toBeTypeOf('function');
    expect(slsWithDefault.debug).toBeTypeOf('function');
    expect(slsWithDefault.log).toBeTypeOf('function');
    expect(slsWithDefault.info).toBeTypeOf('function');
    expect(slsWithDefault.warn).toBeTypeOf('function');
    expect(slsWithDefault.error).toBeTypeOf('function');
    expect(slsWithDefault.fatal).toBeTypeOf('function');
  });
  
  test('createLogger(), options.prefix', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      prefix: 'hello/'
    });
    
    mySls('world');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('hello/world');
  });
  
  test('createLogger(), options.defaultParams as object', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      defaultParams: {
        hello: 'default params'
      }
    });
    
    mySls('topic-default-params');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-default-params');
    expect(body.__logs__[0]?.hello).toBe('default params');
  });
  
  test('createLogger(), options.defaultParams as fn', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      defaultParams() {
        return {
          hello: 'default params returned by fn'
        };
      }
    });
    
    mySls('topic-default-params-fn');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-default-params-fn');
    expect(body.__logs__[0]?.hello).toBe('default params returned by fn');
  });
  
  test('createLogger(), options.dontSend', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      dontSend: () => true
    });
    
    mySls('topic-should-omit');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(0);
  });
  
  test('createLogger(), options.sampling', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      sampling: 0.3
    });
    
    const spyMathRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    
    mySls('topic-sampling');
    
    await sleep(WAIT_TIME);
    expect(spyMathRandom).toHaveBeenCalled();
    expect(fetchMock.callHistory.calls().length).toBe(0);
    
    mySls({
      sampling: 0.8 // override 0.3
    }, 'topic-sampling');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    spyMathRandom.mockRestore();
  });
});