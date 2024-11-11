import {
  Fetcher
} from '@kcuf/fetcher';

import {
  TDoLogin,
  TNeedLogin
} from '../types';

import createInterceptorResponseRejected from './create-interceptor-response-rejected';

/**
 * 当接口报未登录，可以弹窗登录，优先级必须高于 `merging`
 */
export default function intercept(fetcher: Fetcher, needLogin: TNeedLogin, doLogin: TDoLogin, priority = 25): () => void {
  return fetcher.interceptResponse(undefined, createInterceptorResponseRejected(needLogin, doLogin), priority);
}
