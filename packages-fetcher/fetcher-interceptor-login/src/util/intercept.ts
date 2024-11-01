import {
  Fetcher
} from '@kcuf/fetcher';

import {
  TDoLogin,
  TNeedLogin
} from '../types';

import createInterceptorResponseRejected from './create-interceptor-response-rejected';

export default function intercept(fetcher: Fetcher, needLogin: TNeedLogin, doLogin: TDoLogin, priority = 40): () => void {
  return fetcher.interceptResponse(undefined, createInterceptorResponseRejected(needLogin, doLogin), priority);
}
