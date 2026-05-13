import {
  Fetcher,
  createFetcher
} from '@kcuf/fetcher';
import interceptBiz from '@kcuf/fetcher-interceptor-biz';
import interceptCacheLocal from '@kcuf/fetcher-interceptor-cache-local';
// import interceptMerging from '@kcuf/fetcher-interceptor-merging';
import interceptSls from '@kcuf/fetcher-interceptor-sls';

import {
  IFetcherFactoryOptions
} from './types';
import {
  defaultBizGetMessage,
  defaultBizIsSuccess
} from './util';

export default function fetcherFactory({
  urlBase,
  getHeaders,
  isSuccess = defaultBizIsSuccess,
  getMessage = defaultBizGetMessage,
  slsOptions
}: IFetcherFactoryOptions = {}): Fetcher {
  const fetcher = createFetcher({
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
    fetcher.interceptRequest(() => ({
      headers: getHeaders()
    }));
  }
  
  interceptBiz(fetcher, {
    isSuccess,
    getMessage
  });
  interceptCacheLocal(fetcher);
  // interceptMerging(fetcher); // FIXME 暂时不能用，会跟 interceptor-login 冲突
  
  if (slsOptions) {
    interceptSls(fetcher, slsOptions);
  }
  
  return fetcher;
}
