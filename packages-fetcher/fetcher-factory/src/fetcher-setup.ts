import interceptHeaders from '@kcuf/fetcher-interceptor-headers';
import interceptSls from '@kcuf/fetcher-interceptor-sls';
import interceptLogin from '@kcuf/fetcher-interceptor-login';

import {
  IFetcherFactoryOptions,
  TFetcher
} from './types';

/**
 * 允许对 Fetcher 进行设置，有些拦截器需要考虑多环境，可能根据业务不同而不同，
 * 有些则是在初始化时不方便设置（比如登录有可能造成循环依赖），通常此操作在
 * 应用启动时进行，且默认只允许执行一次，因此执行完会默认封禁拦截器扩展
 */
export default function fetcherSetup(fetcher: TFetcher, {
  urlBase,
  getHeaders,
  interceptorSlsOptions,
  interceptorLoginOptions
}: Omit<IFetcherFactoryOptions, 'interceptorBizOptions'>, seal = true): void {
  if (urlBase) {
    fetcher.interceptRequest(() => ({
      urlBase
    }));
  }
  
  if (getHeaders) {
    interceptHeaders(fetcher, getHeaders);
  }
  
  if (interceptorSlsOptions) {
    interceptSls(fetcher, interceptorSlsOptions);
  }
  
  if (interceptorLoginOptions) {
    interceptLogin(fetcher, interceptorLoginOptions);
  }
  
  if (seal) {
    fetcher.sealInterceptors(); // 不要多次 setup
  }
}
