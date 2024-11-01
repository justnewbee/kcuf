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

import fetcher from '../src';

import {
  API_POST,
  API_UPLOAD
} from './const';
import {
  setupFetchMock
} from './util';

describe('content-type', () => {
  beforeEach(setupFetchMock);
  
  test('Content-Type according to body - null', async () => {
    await fetcher.post(API_POST.url);
    
    expect(fetchMock.calls().length).toBe(1);
    expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBeNull();
    expect(fetchMock.lastCall()?.[1]?.body).toBeUndefined();
  });
  
  test('Content-Type according to body - string', async () => {
    await fetcher.post(API_POST.url, 'hello=text,test=content-type');
    
    expect(fetchMock.calls().length).toBe(1);
    expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(fetchMock.lastCall()?.[1]?.body).toBe('hello=text,test=content-type');
  });
  
  test('Content-Type according to body - plain', async () => {
    await fetcher.post(API_POST.url, {
      hello: 'world'
    });
    
    expect(fetchMock.calls().length).toBe(1);
    expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(fetchMock.lastCall()?.[1]?.body).toBe('hello=world');
  });
  
  test('Content-Type according to body - FormData', async () => {
    const formData = new FormData();
    
    formData.append('a', 'a1');
    formData.append('a', 'a2');
    
    await fetcher.post(API_POST.url, formData);
    
    expect(fetchMock.calls().length).toBe(1);
    // expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('multipart/form-data; boundary---...'); // mock 的 不会
    expect(fetchMock.lastCall()?.[1]?.body instanceof FormData).toBe(true);
  });
  
  test('FormData upload', async () => {
    const formData = new FormData();
    
    formData.append('file', new File(['bubblegum pie'], 'my-file'));
    
    const promises = fetcher.post(API_UPLOAD.url, formData);
    
    expect(promises).resolves.toEqual(API_UPLOAD.result);
    
    await promises;
    
    expect(fetchMock.calls().length).toBe(1);
    // expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('multipart/form-data; boundary---...'); // mock 的 不会
    expect(fetchMock.lastCall()?.[1]?.body instanceof FormData).toBe(true);
  });
  
  test('Content-Type according to body - URLSearchParams', async () => {
    const searchParams = new URLSearchParams();
    
    searchParams.append('a', 'a1');
    searchParams.append('a', 'a2');
    
    await fetcher.post(API_POST.url, searchParams);
    
    expect(fetchMock.calls().length).toBe(1);
    // expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('application/x-www-form-urlencoded;charset=UTF-8'); // mock 的 不会
    expect(fetchMock.lastCall()?.[1]?.body instanceof URLSearchParams).toBe(true);
  });
  
  test('Content-Type according to headers', async () => {
    await fetcher.post({
      headers: {
        'content-type': 'application/json'
      }
    }, API_POST.url, {
      hello: 'world'
    });
    
    expect(fetchMock.calls().length).toBe(1);
    expect((fetchMock.lastCall()?.[1]?.headers as Headers).get('Content-Type')).toBe('application/json');
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('{"hello":"world"}');
  });
});