import {
  FetcherErrorName,
  FetcherConfig,
  FetcherError,
  FetcherResponse,
  FetcherCallRequest,
  FetcherInterceptResponseRejected,
  deleteConfigHeaders
} from '@kcuf/fetcher';

import {
  ICreateInterceptorOptions
} from '../types';

import singletonPromise from './singleton-promise';

export default function createInterceptorResponseRejected({
  needLogin,
  doLogin,
  headerKeys
}: ICreateInterceptorOptions): FetcherInterceptResponseRejected {
  const singletonLogin = singletonPromise(doLogin);
  
  return async (error: FetcherError, fetcherConfig: FetcherConfig, _: FetcherResponse<unknown> | undefined, requestByInterceptor: FetcherCallRequest) => {
    if (!needLogin(error.code ?? '', error)) {
      throw error;
    }
    
    return singletonLogin().then(() => {
      if (headerKeys) {
        deleteConfigHeaders(fetcherConfig, headerKeys);
      }
      
      return requestByInterceptor(fetcherConfig); // 登录完成，重新发起原请求
    }, () => {
      // 一般登录弹窗在登录成功之前是不应该被关闭或取消的，但若真允许取消，这里需要修改错误为「取消登录」
      error.name = FetcherErrorName.LOGIN_CANCELLED;
      
      throw error; // 以新的 name 继续抛错
    });
  };
}
