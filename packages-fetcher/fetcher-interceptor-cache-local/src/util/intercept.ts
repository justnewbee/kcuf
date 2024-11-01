import {
  Fetcher
} from '@kcuf/fetcher';

import createInterceptorRequest from './create-interceptor-request';
import createInterceptorResponseFulfilled from './create-interceptor-response-fulfilled';
import createInterceptorResponseRejected from './create-interceptor-response-rejected';

export default function intercept(fetcher: Fetcher, priority = 20): () => void {
  const release1 = fetcher.interceptRequest(createInterceptorRequest(), priority);
  const release2 = fetcher.interceptResponse(createInterceptorResponseFulfilled(), createInterceptorResponseRejected(), priority);
  
  return () => {
    release1();
    release2();
  };
}
