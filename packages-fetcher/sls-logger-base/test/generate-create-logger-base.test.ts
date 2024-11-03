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

import {
  generateCreateLoggerBase
} from '../src';

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

describe('generateCreateLoggerBase', () => {
  beforeEach(setupFetchMock);
  
  test('generateCreateLoggerBase factoryDefaultParams object', async () => {
    await sleep(SILENT_TIME);
    
    const myCreateLogger = generateCreateLoggerBase(sender, {
      defaultParams: {
        param1: 'factory param1'
      }
    });
    const mySls = myCreateLogger(LOGGER_OPTIONS);
    
    mySls('topic-factory-param');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    let body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-factory-param');
    expect(body.__logs__[0]?.param1).toBe('factory param1');
    
    mySls('topic-override-param1', {
      param1: 'override param1'
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-override-param1');
    expect(body.__logs__[0]?.param1).toBe('override param1');
  });
  
  test('generateCreateLoggerBase factoryDefaultParams fn', async () => {
    await sleep(SILENT_TIME);
    
    const myCreateLogger = generateCreateLoggerBase(sender, {
      defaultParams: () => ({
        paramDynamic: 'factory param dynamic'
      })
    });
    const mySls = myCreateLogger(LOGGER_OPTIONS);
    
    mySls('topic-factory-param');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    let body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-factory-param');
    expect(body.__logs__[0]?.paramDynamic).toBe('factory param dynamic');
    
    mySls('topic-override-dynamic-param', {
      paramDynamic: 'override param'
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(2);
    
    body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-override-dynamic-param');
    expect(body.__logs__[0]?.paramDynamic).toBe('override param');
  });
  
  test('generateCreateLoggerBase factoryShouldIgnore', async () => {
    await sleep(SILENT_TIME);
    
    const myCreateLogger = generateCreateLoggerBase(sender, {
      dontSend: () => Math.random() < 0.5
    });
    const mySls = myCreateLogger(LOGGER_OPTIONS);
    let spyMathRandom = vi.spyOn(Math, 'random').mockReturnValue(0.4);
    
    mySls('topic-factory-should-omit');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(0);
    
    spyMathRandom.mockRestore();
    
    spyMathRandom = vi.spyOn(Math, 'random').mockReturnValue(0.7);
    
    mySls('topic-factory-should-omit');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    spyMathRandom.mockRestore();
  });
  
  test('generateCreateLoggerBase factoryShouldIgnore override', async () => {
    await sleep(SILENT_TIME);
    
    let myIgnore = 1;
    
    const myCreateLogger = generateCreateLoggerBase(sender, {
      dontSend: () => Math.random() < 0.5
    });
    const mySls = myCreateLogger({
      ...LOGGER_OPTIONS,
      dontSend: () => myIgnore % 2 === 0
    });
    const spyMathRandom = vi.spyOn(Math, 'random').mockReturnValue(0.7);
    
    mySls('topic-factory-should-omit-override');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    myIgnore = 4;
    
    mySls('topic-factory-should-omit-override2');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.callHistory.calls().length).toBe(1);
    
    spyMathRandom.mockRestore();
  });
});