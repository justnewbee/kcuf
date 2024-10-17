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

import pkgInfo from '../package.json';
import fetcher from '../src';

import {
  APIS,
  RESULTS
} from './const';
import {
  setupFetchMock
} from './util';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(setupFetchMock);
  
  test('params parse', async () => {
    expect(await fetcher.get(APIS.GET_WITH_PARAMS, {
      id: 1234,
      arr: [1, 2]
    })).toEqual(RESULTS.GET_WITH_PARAMS);
  });
  
  test('body parse', async () => {
    await fetcher.post(APIS.POST, {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    });
    
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('str=a%20string&num=1234&boo=true&arr=1&arr=2&arr=33&arr%5Bright%5D=x');
    
    await fetcher.post({
      headers: {
        'Content-type': 'application/json'
      }
    }, APIS.POST, {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    });
    
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('{"str":"a string","num":1234,"boo":true,"arr":[1,"2",33,{"right":"x"}]}');
  });
  
  test('responseType text', () => {
    const promise = fetcher.post({
      responseType: 'text'
    }, APIS.TEXT);
    
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