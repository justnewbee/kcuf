import {
  FetcherErrorName,
  FetcherConfig,
  FetcherError,
  FetcherResponse,
  FetcherCallRequest,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher-core';

import {
  IFetcherInterceptorLoginOptions
} from '../types';

import singletonPromise from './singleton-promise';

export default function createInterceptorResponseRejected({
  needLogin,
  doLogin
}: IFetcherInterceptorLoginOptions): FetcherInterceptResponseRejected {
  const singletonLogin = singletonPromise(doLogin);
  
  return (error: FetcherError, config: FetcherConfig, _: FetcherResponse | undefined, requestByInterceptor: FetcherCallRequest) => {
    if (!needLogin(error.code ?? '', error)) {
      throw error;
    }
    
    return singletonLogin().then(() => {
      return requestByInterceptor(config._config ?? {}); // 登录完成，利用原初 _config 对象（一定存在）重新发起请求
    }, () => {
      // 一般登录弹窗在登录成功之前是不应该被关闭或取消的，但若真允许取消，这里需要修改错误为「取消登录」
      error.name = FetcherErrorName.LOGIN_CANCELLED;
      
      throw error; // 以新的 name 继续抛错
    });
  };
}
