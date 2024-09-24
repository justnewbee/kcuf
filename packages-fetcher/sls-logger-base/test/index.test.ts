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

import pkgInfo from '../package.json';
import createLogger, {
  generateCreateLoggerBase
} from '../src';

import {
  SILENT_TIME,
  WAIT_TIME,
  MAX_CHUNK,
  LOGGER_OPTIONS,
  PAYLOAD_FOR_FLATTEN
} from './const';
import {
  sleep,
  sender,
  getLastCallBody
} from './util';

const sls = createLogger(sender, LOGGER_OPTIONS);

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.mock('*', 200);
  });
  
  test('sls is a function with some quick functions attached', () => {
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
  
  test('simple methods with group predefined', async () => {
    await sleep(SILENT_TIME);
    
    sls('topic');
    sls.debug('topic-debug');
    sls.log('topic-log');
    sls.info('topic-info');
    sls.warn('topic-warn');
    sls.error('topic-error');
    sls.fatal('topic-fatal');
    
    sls.fatal({
      instant: true
    }, 'topic-fatal');
    expect(fetchMock.calls().length).toBe(1);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic');
    expect(body.__logs__[1]?._TOPIC).toBe('topic-debug');
    expect(body.__logs__[2]?._TOPIC).toBe('topic-log');
    expect(body.__logs__[3]?._TOPIC).toBe('topic-info');
    expect(body.__logs__[4]?._TOPIC).toBe('topic-warn');
    expect(body.__logs__[5]?._TOPIC).toBe('topic-error');
    expect(body.__logs__[6]?._TOPIC).toBe('topic-fatal');
    
    expect(body.__logs__[0]?._GROUP).toBe('LOG');
    expect(body.__logs__[1]?._GROUP).toBe('DEBUG');
    expect(body.__logs__[2]?._GROUP).toBe('LOG');
    expect(body.__logs__[3]?._GROUP).toBe('INFO');
    expect(body.__logs__[4]?._GROUP).toBe('WARN');
    expect(body.__logs__[5]?._GROUP).toBe('ERROR');
    expect(body.__logs__[6]?._GROUP).toBe('FATAL');
  });
  
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?.__topic__).toBe('topic-empty');
    expect(body.__logs__[0]?.a).toBe('aa');
    expect(body.__logs__[0]?.b).toBeUndefined();
    expect(body.__logs__[0]?.c).toBeUndefined();
    expect(body.__logs__[0]?.d).toBeUndefined();
    expect(body.__logs__[0]?.z).toBe('0');
  });
  
  test('payload is error', async () => {
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
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-error');
    expect(body.__logs__[0]?.name).toBe('Error');
    expect(body.__logs__[0]?.message).toBe('Error message');
    expect(body.__logs__[0]?.code).toBe('123456');
    expect(body.__logs__[0]?.loggedIn).toBe('true');
    expect(body.__logs__[0]?.details).toBe('{"info":"some info","reason":"some reason","doc":"some doc"}');
  });
  
  test('payload flatten true', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: true
    }, 'topic-flatten-true', {
      error: new Error('Error message'),
      aa: 1234,
      right: true,
      wrong: false
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-true');
    expect(body.__logs__[0]?.['error.name']).toBe('Error');
    expect(body.__logs__[0]?.['error.message']).toBe('Error message');
    expect(body.__logs__[0]?.aa).toBe('1234');
    expect(body.__logs__[0]?.right).toBe('true');
    expect(body.__logs__[0]?.wrong).toBe('false');
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-omit-array-mixed');
    expect(body.__logs__[0]?.['xx._omitByDefault']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.iWillBeIgnored']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.url']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.request.status']).toBeUndefined();
    expect(body.__logs__[0]?.['xx.iWillBeIgnored']).toBeUndefined();
  });
  
  test('payload flatten, depth & pass', async () => {
    await sleep(SILENT_TIME);
    
    sls({
      flatten: {
        pass: 'response.data'
      }
    }, 'topic-flatten-pass', PAYLOAD_FOR_FLATTEN);
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    const body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-flatten-pass');
    expect(body.__logs__[0]?.['request.url']).toBe('url');
    expect(body.__logs__[0]?.['response.status']).toBe('200');
    expect(body.__logs__[0]?.['response.data']).toBeTypeOf('string');
    expect(body.__logs__[0]?.['a.b.c.d.e']).toBe('{"f":{"g":"ABCDEFG"}}'); // default depth 5
  });
  
  test('createLogger(), options.prefix', async () => {
    await sleep(SILENT_TIME);
    
    const mySls = createLogger(sender, {
      ...LOGGER_OPTIONS,
      prefix: 'hello/'
    });
    
    mySls('world');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(0);
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
    expect(fetchMock.calls().length).toBe(0);
    
    mySls({
      sampling: 0.8 // override 0.3
    }, 'topic-sampling');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    spyMathRandom.mockRestore();
  });
  
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
    expect(fetchMock.calls().length).toBe(1);
    
    let body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-factory-param');
    expect(body.__logs__[0]?.param1).toBe('factory param1');
    
    mySls('topic-override-param1', {
      param1: 'override param1'
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
    let body = getLastCallBody();
    
    expect(body.__logs__[0]?._TOPIC).toBe('topic-factory-param');
    expect(body.__logs__[0]?.paramDynamic).toBe('factory param dynamic');
    
    mySls('topic-override-dynamic-param', {
      paramDynamic: 'override param'
    });
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(2);
    
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
    expect(fetchMock.calls().length).toBe(0);
    
    spyMathRandom.mockRestore();
    
    spyMathRandom = vi.spyOn(Math, 'random').mockReturnValue(0.7);
    
    mySls('topic-factory-should-omit');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
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
    expect(fetchMock.calls().length).toBe(1);
    
    myIgnore = 4;
    
    mySls('topic-factory-should-omit-override2');
    
    await sleep(WAIT_TIME);
    expect(fetchMock.calls().length).toBe(1);
    
    spyMathRandom.mockRestore();
  });
});