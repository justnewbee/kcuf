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

import pkgInfo from '../package.json';
import interceptLogin from '../src';

interface IResult {
  data: unknown;
}

const CODE_NEED_LOGIN = 'NeedLogin';

const fetcher = createFetcher();
let loggedIn = false;
let willCancelLogin = false;

fetcher.interceptResponse((result, config) => { // 模拟 intercept biz
  if (config.url === '/api/error/not-biz') {
    const err: FetcherError = new Error('Please login');
    
    err.code = CODE_NEED_LOGIN; // useless for name not biz
    
    throw err;
  }
  
  if (config.url === '/api/error/no-code') {
    const err: FetcherError = new Error('Please login');
    
    err.name = FetcherErrorName.BIZ;
    
    throw err;
  }
  
  if (loggedIn) {
    return (result as IResult).data;
  }
  
  const err: FetcherError = new Error('Please login');
  
  err.name = FetcherErrorName.BIZ;
  err.code = CODE_NEED_LOGIN;
  
  throw err;
});

const needLogin = vi.fn().mockImplementation((code: string): boolean => {
  return code === CODE_NEED_LOGIN;
});

const doLogin = vi.fn().mockImplementation(() => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (willCancelLogin) {
        reject();
      } else {
        loggedIn = true;
        resolve();
      }
    }, 100);
  });
});

interceptLogin(fetcher, {
  needLogin,
  doLogin
});

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    fetchMock.clearHistory();
    fetchMock.removeRoutes();
    fetchMock.mockGlobal();
    
    loggedIn = false;
    willCancelLogin = false;
    needLogin.mockClear();
    doLogin.mockClear();
    
    fetchMock.route('/api/error/need-login', {
      data: 'logged'
    });
    
    fetchMock.route('/api/error/not-biz', {
      data: 'logged'
    });
    
    fetchMock.route('/api/error/no-code', {
      data: 'logged'
    });
  });
  
  test('will auto login', async () => {
    expect(await fetcher.get('/api/error/need-login')).toBe('logged');
    
    expect(needLogin).toBeCalledTimes(1);
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('do login is singleton', async () => {
    expect(await Promise.all([
      fetcher.get('/api/error/need-login'),
      fetcher.get('/api/error/need-login'),
      fetcher.get('/api/error/need-login')
    ])).toEqual([
      'logged',
      'logged',
      'logged'
    ]);
    
    expect(needLogin).toBeCalledTimes(3);
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('login cancel will transform error', async () => {
    willCancelLogin = true;

    expect(await fetcher.get('/api/error/need-login').catch(err => err.name)).toBe(FetcherErrorName.LOGIN_CANCELLED);

    expect(needLogin).toBeCalledTimes(1);
    expect(doLogin).toBeCalledTimes(1);
  });
  
  test('error not biz is ignored', async () => {
    expect(await fetcher.get('/api/error/not-biz').catch(err => err.name)).toBe('Error');
    expect(await fetcher.get('/api/error/not-biz').catch(err => err.code)).toBe(CODE_NEED_LOGIN);

    expect(needLogin).toBeCalledTimes(0);
    expect(doLogin).toBeCalledTimes(0);
  });
  
  test('error with no code ignored', async () => {
    expect(await fetcher.get('/api/error/no-code').catch(err => err.name)).toBe(FetcherErrorName.BIZ);
    expect(await fetcher.get('/api/error/no-code').catch(err => err.code)).toBeUndefined();

    expect(needLogin).toBeCalledTimes(0);
    expect(doLogin).toBeCalledTimes(0);
  });
});
