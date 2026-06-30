import {
  Fetcher,
  createFetcher
} from '@kcuf/fetcher';
import interceptHeaders from '@kcuf/fetcher-interceptor-headers';
import interceptBiz from '@kcuf/fetcher-interceptor-biz';
import interceptCacheLocal from '@kcuf/fetcher-interceptor-cache-local';
// import interceptMerging from '@kcuf/fetcher-interceptor-merging';
import interceptLogin from '@kcuf/fetcher-interceptor-login';
import interceptSls from '@kcuf/fetcher-interceptor-sls';

import {
  IFetcherConfigX,
  IFetcherFactoryOptions
} from './types';

export default function fetcherFactory({
  urlBase,
  getHeaders,
  interceptorBizOptions,
  interceptorSlsOptions,
  interceptorLoginOptions
}: IFetcherFactoryOptions = {}): Fetcher<IFetcherConfigX> {
  const fetcher = createFetcher<IFetcherConfigX>({
    urlBase: typeof urlBase === 'function' ? urlBase() : urlBase,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (typeof urlBase === 'function') {
    fetcher.interceptRequest(() => ({
      urlBase: urlBase()
    }));
  }
  
  if (getHeaders) {
    interceptHeaders(fetcher, getHeaders);
  }
  
  interceptBiz(fetcher, interceptorBizOptions);
  interceptCacheLocal(fetcher);
  // interceptMerging(fetcher); // FIXME 暂时不能用，会跟 interceptor-login 冲突
  
  if (interceptorSlsOptions) {
    interceptSls(fetcher, interceptorSlsOptions);
  }
  
  if (interceptorLoginOptions) {
    interceptLogin(fetcher, interceptorLoginOptions);
  }
  
  return fetcher;
}
