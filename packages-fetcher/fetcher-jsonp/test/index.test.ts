import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';

import {
  JSDOM
} from 'jsdom';

import pkgInfo from '../package.json';
import fetcherJsonp from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  let dom: JSDOM;
  
  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>JsDom</title></head><body></body></html>', {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    
    global.window = dom.window;
    global.document = dom.window.document;
  });
  
  afterEach(() => {
    dom.window.close();
    
    delete global.window;
    delete global.document;
  });
  
  const JSONP_URL = 'https://jsfiddle.net/echo/jsonp?who=boshit&love=wlp';
  const JSONP_RESULT = {
    who: 'boshit',
    love: 'wlp'
  };
  
  test('will be invoked', () => {
    const mockFn = vi.fn(fetcherJsonp);
    
    mockFn(JSONP_URL);
    mockFn(JSONP_URL);
    mockFn(JSONP_URL);
    
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
  
  test('.then(response => response.json()) will get the JSON object', () => {
    expect(fetcherJsonp(JSONP_URL).then(response => response.json())).resolves.toEqual(JSONP_RESULT);
  });
  
  test('404 will always timeout', () => {
    expect(fetcherJsonp('/api-404', {
      timeout: 200
    })).rejects.toThrowError('JSONP timeout after 200ms, url = /api-404');
    expect(fetcherJsonp('/api-404', {
      timeout: 200
    })).rejects.toHaveProperty('name', 'JsonpErrorTimeout');
    expect(fetcherJsonp('/api-404', {
      timeout: 200
    })).rejects.toHaveProperty('name', 'JsonpErrorTimeout');
  });
  
  test('custom callback, lifecycle and charset (success)', async () => {
    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      charset: 'gb2312'
    }).then(response => response.json());
    
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)?.getAttribute('charset')).toEqual('gb2312');
    expect(global.document.querySelector(scriptQuery)?.tagName).toEqual('SCRIPT');
    
    expect(await promise).toEqual(JSONP_RESULT);
    
    // @ts-ignore
    expect(global.window[callbackFn]).toBeFalsy(); // cleared
    expect(global.document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });
  
  test('custom callback, lifecycle and charset (failure)', async () => {
    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      timeout: 10
    }).then(response => response.json());
    
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)).toBeTruthy();
    
    expect(await promise.catch(error => error)).toHaveProperty('name', 'JsonpErrorTimeout');
    
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy(); // by design, NOT cleared yet
    expect(global.document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });
  
  test('can be aborted', () => {
    const abortController = new AbortController();
    const promise = fetcherJsonp('/api-abort', {
      signal: abortController.signal
    });
    
    expect(promise).rejects.toThrowError('JSONP aborted, url = /api-abort');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    
    abortController.abort();
  });
  
  test('can set callback param name', () => {
    expect(fetcherJsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp', {
      jsonpCallback: 'jsonp'
    })).resolves.toBeTruthy();
  });
});