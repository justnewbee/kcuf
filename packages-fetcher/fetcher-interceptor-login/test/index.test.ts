/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach,
  vi
} from 'vitest';
import fetchMock from 'fetch-mock';

import {
  FetcherErrorName,
  FetcherError,
  createFetcher
} from '@kcuf/fetcher';

import interceptLogin, {
  messageListenInterceptorLogin
} from '../src';

interface IResult {
  data: unknown;
}

const API_URL_NEED_LOGIN = '/api/error/need-login';
const API_URL_NO_CODE = '/api/error/no-code';
const CODE_NEED_LOGIN = 'NeedLogin';

const fetcher = createFetcher();
let loggedIn = false;
let willCancelLogin = false;

fetcher.interceptResponse((result, config) => { // 模拟 intercept biz
  if (loggedIn) {
    return (result as IResult).data;
  }
  
  if (config.url === API_URL_NO_CODE) {
    const err: FetcherError = new Error('Please login');
    
    err.name = FetcherErrorName.BIZ;
    
    throw err;
  }
  
  const err: FetcherError = new Error('Please login');
  
  err.name = FetcherErrorName.BIZ;
  err.code = CODE_NEED_LOGIN;
  
  throw err;
});

const needLogin = vi.fn().mockImplementation((code: string): boolean => {
  return code === CODE_NEED_LOGIN;
});

const listenInterceptorLoginCallback = vi.fn().mockImplementation((_logged: boolean, _info: unknown): void => {
  // do nothing
});

const doLogin = vi.fn().mockImplementation(() => {
  const release = messageListenInterceptorLogin((logged, info) => {
    listenInterceptorLoginCallback(logged, info);
  });
  
  return new Promise<true>((resolve, reject) => {
    setTimeout(() => {
      if (willCancelLogin) {
        reject(new Error('Cancelled'));
      } else {
        loggedIn = true;
        resolve(true);
      }
      
      release();
    }, 200);
  });
});

interceptLogin(fetcher, {
  needLogin,
  doLogin
});

describe('fetcherInterceptorLogin', () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    loggedIn = false;
    willCancelLogin = false;
    needLogin.mockClear();
    listenInterceptorLoginCallback.mockClear();
    doLogin.mockClear();
    
    fetchMock.route(API_URL_NEED_LOGIN, {
      data: 'logged'
    });
    
    fetchMock.route(API_URL_NO_CODE, {
      data: 'logged'
    });
  });
  
  test('will auto login', async () => {
    expect(await fetcher.get(API_URL_NEED_LOGIN)).toBe('logged');
    
    expect(needLogin).toBeCalledTimes(1);
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('doLogin is singleton', async () => {
    expect(await Promise.all([
      fetcher.get(API_URL_NEED_LOGIN),
      fetcher.get(API_URL_NEED_LOGIN),
      fetcher.get(API_URL_NEED_LOGIN)
    ])).toEqual([
      'logged',
      'logged',
      'logged'
    ]);
    
    expect(needLogin).toBeCalledTimes(3);
    expect(listenInterceptorLoginCallback).toBeCalledTimes(1); // message 会被触发
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('login cancel will transform error', async () => {
    willCancelLogin = true;

    expect(await fetcher.get(API_URL_NEED_LOGIN).catch((err: unknown) => (err as FetcherError).name)).toBe(FetcherErrorName.LOGIN_CANCELLED);

    expect(needLogin).toBeCalledTimes(1);
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('error with no code will not doLogin', async () => {
    expect(await fetcher.get(API_URL_NO_CODE).catch((err: unknown) => (err as FetcherError).name)).toBe(FetcherErrorName.BIZ);
    expect(await fetcher.get(API_URL_NO_CODE).catch((err: unknown) => (err as FetcherError).code)).toBeUndefined();

    expect(needLogin).toBeCalledTimes(2);
    expect(doLogin).toBeCalledTimes(0);
  });
});
