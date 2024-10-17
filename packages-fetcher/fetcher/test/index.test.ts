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
import fetcher, {
  createFetcher,
  createFetcherErrorSkipNetwork,
  FetcherConfig,
  FetcherErrorName
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  const RESULT = {
    data: 'whatever'
  };
  
  beforeEach(() => {
    fetchMock.reset();
    
    fetchMock.get('/api/get', () => RESULT);
    fetchMock.get('/api/get-with-params?id=1234&arr=1&arr=2', () => RESULT);
    fetchMock.post('/api/post', () => RESULT);
    fetchMock.put('/api/put', () => RESULT);
    fetchMock.patch('/api/patch', () => RESULT);
    fetchMock.delete('/api/delete', () => RESULT);
    
    fetchMock.mock('https://anotherdomain.com/api/cors', () => RESULT);
    fetchMock.mock('http://anotherdomain.com/api/cors', () => RESULT);
    fetchMock.mock('/api/abort', () => new Promise(resolve => setTimeout(() => resolve({
      data: 'aborted'
    }), 100)));
    
    fetchMock.mock('/api/text', () => 'api returning text');
    
    fetchMock.get('/api/200', 200);
    fetchMock.post('/api/201', 201);
    fetchMock.put('/api/255', 255);
    fetchMock.delete('/api/299', 299);
    
    fetchMock.mock('/api/300', 300);
    fetchMock.mock('/api/404', 404);
    fetchMock.mock('/api/500', 500);
  });
  
  test('await to get fetchMock stats', async () => {
    // ⛱️ 不是 BUG
    // fetcher 对拦截器进行了异步处理，因而 fetch 的调用也异步，调用 fetcher 后，无法立即反应到 `fetchMock`，故此，对 fetchMock
    // 的状态判断都需要先对 await fetcher
    await Promise.all([
      fetcher.get('/api/get'),
      fetcher.post('/api/post'),
      fetcher.put('/api/put'),
      fetcher.patch('/api/patch'),
      fetcher.delete('/api/delete')
    ]);
    
    expect(fetchMock.calls().length).toBe(5);
  });
  
  test('methods', () => {
    expect(fetcher.get('/api/get')).resolves.toEqual(RESULT);
    expect(fetcher.post('/api/post', {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    })).resolves.toEqual(RESULT);
    expect(fetcher.put('/api/put')).resolves.toEqual(RESULT);
    expect(fetcher.patch('/api/patch')).resolves.toEqual(RESULT);
    expect(fetcher.delete('/api/delete')).resolves.toEqual(RESULT);
  });
  
  test('params parse', async () => {
    expect(await fetcher.get('/api/get-with-params?id=1234&arr=1&arr=2', {
      id: 1234,
      arr: [1, 2]
    })).toEqual(RESULT);
  });
  
  test('body parse', async () => {
    await fetcher.post('/api/post', {
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
    }, '/api/post', {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    });
    
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('{"str":"a string","num":1234,"boo":true,"arr":[1,"2",33,{"right":"x"}]}');
  });
  
  test('cors', async () => {
    await fetcher.get('https://anotherdomain.com/api/cors');
    
    expect(fetchMock.calls().length).toBe(1);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
    
    await fetcher.get('http://anotherdomain.com/api/cors');
    
    expect(fetchMock.calls().length).toBe(2);
    expect(fetchMock.lastCall()?.[1]?.credentials).toBe('include');
  });
  
  test('status 200-299 ok, no data', () => {
    expect(fetcher.get('/api/200')).rejects.toHaveProperty('name', 'FetcherError.ResponseParse');
    expect(fetcher.post('/api/201')).rejects.toHaveProperty('name', 'FetcherError.ResponseParse');
    expect(fetcher.put('/api/255')).rejects.toHaveProperty('name', 'FetcherError.ResponseParse');
    expect(fetcher.delete('/api/299')).rejects.toHaveProperty('name', 'FetcherError.ResponseParse');
  });
  
  test('response status NOT 200', () => {
    expect(fetcher.get('/api/300')).rejects.toHaveProperty('name', 'FetcherError.ResponseStatus');
    expect(fetcher.get('/api/404')).rejects.toHaveProperty('name', 'FetcherError.ResponseStatus');
    expect(fetcher.post('/api/500')).rejects.toHaveProperty('name', 'FetcherError.ResponseStatus');
  });
  
  test('timeout', () => {
    fetchMock.get('/api/timeout', () => new Promise(resolve => setTimeout(() => resolve({
      hello: 'world'
    }), 250)));
    
    expect(fetcher.get({
      timeout: 100
    }, '/api/timeout')).rejects.toHaveProperty('name', FetcherErrorName.TIMEOUT);
  });
  
  test('abort', () => {
    const abortController = new AbortController();
    const promise = fetcher.post({
      signal: abortController.signal
    }, '/api/abort');
    
    expect(promise).rejects.toThrowError('The operation was aborted.');
    expect(promise).rejects.toHaveProperty('name', 'AbortError');
    
    abortController.abort();
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
  
  test('responseType text', () => {
    const promise = fetcher.post({
      responseType: 'text'
    }, '/api/text');
    
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
  
  test('interceptor request', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest(() => ({
      body: {
        addedByInterceptor: true
      }
    }));
    
    await myFetcher.post('/api/post');
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('addedByInterceptor=true');
    
    // body will merge 1
    await myFetcher.post('/api/post', {
      whenCall: 123
    });
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('whenCall=123&addedByInterceptor=true');
    
    // body will merge 2
    await myFetcher.post('/api/post', 'whenCall=strMode');
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('whenCall=strMode&addedByInterceptor=true');
    
    // eject the interceptor
    eject();
    
    await myFetcher.post('/api/post', {
      noInterceptorNow: true
    });
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('noInterceptorNow=true');
  });
  
  test('interceptor request - skip network', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptRequest((config: FetcherConfig): never => {
      throw createFetcherErrorSkipNetwork('no request was made', config);
    });
    
    const result = await myFetcher.post('/api/post');
    
    expect(result).toBe('no request was made');
    expect(fetchMock.calls().length).toBe(0);
    
    eject();
    expect(myFetcher.post('/api/post')).resolves.toEqual(RESULT);
  });
  
  test('interceptor response onFulfilled', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptResponse(() => {
      return 'response altered';
    });
    
    expect(await myFetcher.post('/api/post')).toBe('response altered');
    
    eject();
    expect(myFetcher.post('/api/post')).resolves.toEqual(RESULT);
  });
  
  test('interceptor response onRejected', async () => {
    const myFetcher = createFetcher();
    const eject = myFetcher.interceptResponse(undefined, () => new Promise(resolve => {
      setTimeout(() => resolve('response corrected'), 200);
    }));
    
    expect(await myFetcher.post('/api/404')).toBe('response corrected');
    
    eject();
    expect(fetcher.get('/api/404')).rejects.toHaveProperty('name', 'FetcherError.ResponseStatus');
  });
});