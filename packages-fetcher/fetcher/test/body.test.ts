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
  API_POST
} from './const';
import {
  setupFetchMock
} from './util';

describe('parse headers/params/body', () => {
  beforeEach(setupFetchMock);
  
  test('body parse', async () => {
    await fetcher.post(API_POST.url, {
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
    }, API_POST.url, {
      str: 'a string',
      num: 1234,
      boo: true,
      arr: [1, '2', 33, {
        right: 'x'
      }]
    });
    
    expect(fetchMock.lastCall()?.[1]?.body).toEqual('{"str":"a string","num":1234,"boo":true,"arr":[1,"2",33,{"right":"x"}]}');
  });
});