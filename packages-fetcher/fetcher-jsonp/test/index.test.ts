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
    // environment 不能运行脚本，所以需要自制 DOM，两个参数必需
    dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>JsDom</title></head><body></body></html>', {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    
    (global as Record<string, unknown>).window = dom.window;
    (global as Record<string, unknown>).document = dom.window.document;
  });
  
  afterEach(() => {
    dom.window.close();
    
    delete (global as Record<string, unknown>).window;
    delete (global as Record<string, unknown>).document;
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
    expect(fetcherJsonp('/api/404', {
      timeout: 100
    })).rejects.toThrowError('fetcherJsonp(/api/404) timeout after 100ms');
    expect(fetcherJsonp('/api/404', {
      timeout: 100
    })).rejects.toHaveProperty('name', 'JsonpError.Timeout');
  });
  
  test('custom callback, lifecycle and charset (success)', async () => {
    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`;
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      charset: 'gb2312'
    }).then(response => response.json());
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)?.getAttribute('charset')).toEqual('gb2312');
    expect(global.document.querySelector(scriptQuery)?.tagName).toEqual('SCRIPT');
    
    expect(await promise).toEqual(JSONP_RESULT);
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(global.window[callbackFn]).toBeFalsy(); // cleared
    expect(global.document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });
  
  test('custom callback, lifecycle and charset (failure)', async () => {
    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`;
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      timeout: 10
    }).then(response => response.json());
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy();
    expect(global.document.querySelector(scriptQuery)).toBeTruthy();
    
    expect(await promise.catch(error => error)).toHaveProperty('name', 'JsonpError.Timeout');
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(global.window[callbackFn]).toBeTruthy(); // by design, NOT cleared yet
    expect(global.document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });
  
  test('can be aborted', () => {
    const abortController = new AbortController();
    const promise = fetcherJsonp('/api/abort', {
      signal: abortController.signal
    });
    
    expect(promise).rejects.toThrowError('JSONP aborted, url = /api/abort');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    
    abortController.abort();
  });
  
  test('can set callback param name', () => {
    expect(fetcherJsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp', {
      jsonpCallback: 'jsonp'
    })).resolves.toBeTruthy();
  });
  
  test('responseType: text', () => {
    expect(fetcherJsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp', {
      jsonpCallback: 'jsonp'
    }).then(response => response.text())).resolves.toBeTypeOf('string');
    
    expect(fetcherJsonp('https://apifoxmock.com/m1/4847676-4502957-default/jsonp', {
      jsonpCallback: 'jsonp',
      jsonpCallbackFunction: 'text-only'
    }).then(response => response.text())).resolves.toBeTypeOf('string');
  });
});