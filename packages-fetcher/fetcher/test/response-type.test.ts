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
  JSDOM
} from 'jsdom';

import fetcher from '../src';

import {
  API_TEXT
} from './const';
import {
  setupFetchMock
} from './util';

describe('response type can be set text', () => {
  beforeEach(setupFetchMock);
  
  test('responseType text', () => {
    const promise = fetcher.post({
      responseType: 'text'
    }, API_TEXT.url);
    
    expect(promise).resolves.toBeTypeOf('string');
  });
  
  test('responseType text - jsonp', async () => {
    const dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>JsDom</title></head><body></body></html>', {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    
    (global as Record<string, unknown>).window = dom.window;
    (global as Record<string, unknown>).document = dom.window.document;
    
    expect(fetcher.jsonp({
      jsonpCallback: 'jsonp',
      jsonpCallbackFunction: 'text-only',
      responseType: 'text'
    }, 'https://apifoxmock.com/m1/4847676-4502957-default/jsonp')).resolves.toBeTypeOf('string');
    
    expect(fetchMock.calls().length).toEqual(0); // 不会调用到 fetch
    
    dom.window.close();
  });
});