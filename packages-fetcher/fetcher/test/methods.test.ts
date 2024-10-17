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
  APIS,
  RESULTS
} from './const';
import {
  setupFetchMock
} from './util';

describe('methods', () => {
  beforeEach(setupFetchMock);
  
  test('standard', () => {
    expect(fetcher.get(APIS.GET)).resolves.toEqual(RESULTS.GET);
    expect(fetcher.post(APIS.POST, {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    })).resolves.toEqual(RESULTS.POST);
    expect(fetcher.put(APIS.PUT)).resolves.toEqual(RESULTS.PUT);
    expect(fetcher.patch(APIS.PATCH)).resolves.toEqual(RESULTS.PATCH);
    expect(fetcher.delete(APIS.DELETE)).resolves.toEqual(RESULTS.DELETE);
  });
  
  test('jsonp', async () => {
    const dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>JsDom</title></head><body></body></html>', {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    
    (global as Record<string, unknown>).window = dom.window;
    (global as Record<string, unknown>).document = dom.window.document;
    
    expect(await fetcher.jsonp('https://jsfiddle.net/echo/jsonp?who=boshit&love=wlp')).toEqual({
      who: 'boshit',
      love: 'wlp'
    });
    
    expect(fetchMock.calls().length).toEqual(0); // 不会调用到 fetch
    
    dom.window.close();
  });
});