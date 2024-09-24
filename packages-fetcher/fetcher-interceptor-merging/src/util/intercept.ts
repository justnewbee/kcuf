import {
  Fetcher
} from '@kcuf/fetcher';

import createInterceptorRequest from './create-interceptor-request';
import createInterceptorResponseFulfilled from './create-interceptor-response-fulfilled';
import createInterceptorResponseRejected from './create-interceptor-response-rejected';

export default function intercept(fetcher: Fetcher, priority = 30): () => void {
  const release1 = fetcher.interceptRequest(priority, createInterceptorRequest());
  const release2 = fetcher.interceptResponse(priority, createInterceptorResponseFulfilled(), createInterceptorResponseRejected());
  
  return () => {
    release1();
    release2();
  };
}
