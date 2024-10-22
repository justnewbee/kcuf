import {
  FetcherErrorName,
  FetcherConfig,
  FetcherError,
  FetcherResponse,
  FetcherCallRequest,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import {
  TNeedLogin,
  TDoLogin
} from '../types';

import shouldDoLogin from './should-do-login';
import singletonPromise from './singleton-promise';

export default function createInterceptorResponseRejected(needLogin: TNeedLogin, doLogin: TDoLogin): FetcherInterceptResponseRejected {
  const singletonLogin = singletonPromise(doLogin);
  
  return async (error: FetcherError, fetcherConfig: FetcherConfig, _: FetcherResponse<unknown> | undefined, requestByInterceptor: FetcherCallRequest) => {
    if (!shouldDoLogin(error, needLogin)) {
      throw error;
    }
    
    return singletonLogin().then(() => {
      return requestByInterceptor(fetcherConfig); // 登录完成，重新发起原请求
    }, () => {
      // 一般登录弹窗在登录成功之前是不应该被关闭或取消的，但若真允许取消，这里需要修改错误为「取消登录」
      error.name = FetcherErrorName.LOGIN_CANCELLED;
      
      throw error; // 以新的 name 继续抛错
    });
  };
}
