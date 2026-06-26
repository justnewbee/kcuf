import {
  TErrorNameNormalizer,
  IFetcher,
  IFetcherConfigDefault,
  TFetcherJsonpArgs,
  TFetcherGetArgs,
  TFetcherPostArgs,
  TFetcherParams,
  TFetcherBody,
  TFetcherAdapter
} from '../types';

import FetcherCore from './fetcher-core';
import requestWithNoBody from './request-with-no-body';
import requestWithBody from './request-with-body';

/**
 * Fetcher 工厂
 */
export default function factory(fetcherAdapter: TFetcherAdapter, normalizeErrorName?: TErrorNameNormalizer): (defaultConfig?: IFetcherConfigDefault) => IFetcher {
  /**
   * 创建 Fetcher 实例，但不会直接把实例返回，因为那样的话用起来会不舒服（方法无法脱离实例进行调用），
   * 所以实际上是返回了一组方法组合成的一个对象。
   */
  return (defaultConfig?: IFetcherConfigDefault): IFetcher => {
    const fetcher = new FetcherCore(fetcherAdapter, normalizeErrorName, defaultConfig);
    
    const interceptRequest = fetcher.interceptRequest.bind(fetcher);
    const interceptResponse = fetcher.interceptResponse.bind(fetcher);
    const sealInterceptors = fetcher.sealInterceptors.bind(fetcher);
    const request = fetcher.request.bind(fetcher);
    
    // 便捷方法
    const jsonp = <T, P extends TFetcherParams>(...args: TFetcherJsonpArgs<P>): Promise<T> => requestWithNoBody<T, P>(fetcher, 'JSONP', args);
    const get = <T, P extends TFetcherParams>(...args: TFetcherGetArgs<P>): Promise<T> => requestWithNoBody<T, P>(fetcher, 'GET', args);
    const deleteFn = <T, B extends TFetcherBody, P extends TFetcherParams>(...args: TFetcherPostArgs<B, P>): Promise<T> => requestWithBody<T, B, P>(fetcher, 'DELETE', args);
    const post = <T, B extends TFetcherBody, P extends TFetcherParams>(...args: TFetcherPostArgs<B, P>): Promise<T> => requestWithBody<T, B, P>(fetcher, 'POST', args);
    const put = <T, B extends TFetcherBody, P extends TFetcherParams>(...args: TFetcherPostArgs<B, P>): Promise<T> => requestWithBody<T, B, P>(fetcher, 'PUT', args);
    const patch = <T, B extends TFetcherBody, P extends TFetcherParams>(...args: TFetcherPostArgs<B, P>): Promise<T> => requestWithBody<T, B, P>(fetcher, 'PATCH', args);
    
    return {
      interceptRequest,
      interceptResponse,
      sealInterceptors,
      request,
      jsonp,
      get,
      delete: deleteFn,
      post,
      put,
      patch
    };
  };
}
