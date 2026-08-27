import {
  Fetcher,
  createFetcher
} from '@kcuf/fetcher';
import interceptBiz from '@kcuf/fetcher-interceptor-biz';
import interceptCacheLocal from '@kcuf/fetcher-interceptor-cache-local';
// import interceptMerging from '@kcuf/fetcher-interceptor-merging';

import {
  IFetcherConfigX,
  IFetcherFactoryOptions
} from './types';
import fetcherSetup from './fetcher-setup';

export default function fetcherFactory({
  urlBase,
  getHeaders,
  interceptorBizOptions,
  interceptorSlsOptions,
  interceptorLoginOptions
}: IFetcherFactoryOptions = {}): Fetcher<IFetcherConfigX> {
  const fetcher = createFetcher<IFetcherConfigX>({
    urlBase,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  interceptBiz(fetcher, interceptorBizOptions);
  interceptCacheLocal(fetcher);
  // interceptMerging(fetcher); // FIXME 暂时不能用，会跟 interceptor-login 冲突
  
  fetcherSetup(fetcher, {
    getHeaders,
    interceptorSlsOptions,
    interceptorLoginOptions
  }, false);
  
  return fetcher;
}
