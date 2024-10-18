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

const sls = createLogger(sender, LOGGER_OPTIONS);

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(setupFetchMock);
  
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
});