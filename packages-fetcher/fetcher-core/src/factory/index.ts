import {
  IFetcher,
  IFetcherConfigDefault,
  TFetcherAdapter,
  TErrorNameNormalizer
} from '../types';

import FetcherCore from './fetcher-core';
import createFnGet from './create-fn-get';
import createFnGetWithAbort from './create-fn-get-with-abort';
import createFnPost from './create-fn-post';
import createFnPostWithAbort from './create-fn-post-with-abort';

/**
 * Fetcher 工厂
 */
export default function factory(fetcherAdapter: TFetcherAdapter, normalizeErrorName?: TErrorNameNormalizer): <X = object>(defaultConfig?: IFetcherConfigDefault) => IFetcher<X> {
  /**
   * 创建 Fetcher 实例，但不会直接把实例返回，因为那样的话用起来会不舒服（方法无法脱离实例进行调用），
   * 所以实际上是返回了一组方法组合成的一个对象。
   */
  return <X = object>(defaultConfig?: IFetcherConfigDefault): IFetcher<X> => {
    const fetcher = new FetcherCore(fetcherAdapter, normalizeErrorName, defaultConfig);
    
    return {
      interceptRequest: fetcher.interceptRequest.bind(fetcher),
      interceptResponse: fetcher.interceptResponse.bind(fetcher),
      sealInterceptors: fetcher.sealInterceptors.bind(fetcher),
      request: fetcher.request.bind(fetcher),
      jsonp: createFnGet(fetcher, 'JSONP'),
      get: createFnGet(fetcher, 'GET'),
      post: createFnPost(fetcher, 'POST'),
      put: createFnPost(fetcher, 'PUT'),
      patch: createFnPost(fetcher, 'PATCH'),
      delete: createFnPost(fetcher, 'DELETE'),
      withAbort: {
        jsonp: createFnGetWithAbort<X>(fetcher, 'JSONP'),
        get: createFnGetWithAbort<X>(fetcher, 'GET'),
        post: createFnPostWithAbort<X>(fetcher, 'POST'),
        put: createFnPostWithAbort<X>(fetcher, 'PUT'),
        patch: createFnPostWithAbort<X>(fetcher, 'PATCH'),
        delete: createFnPostWithAbort<X>(fetcher, 'DELETE')
      }
    };
  };
}
