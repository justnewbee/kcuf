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
export default function factory(fetcherAdapter: TFetcherAdapter, normalizeErrorName?: TErrorNameNormalizer): (defaultConfig?: IFetcherConfigDefault) => IFetcher {
  /**
   * 创建 Fetcher 实例，但不会直接把实例返回，因为那样的话用起来会不舒服（方法无法脱离实例进行调用），
   * 所以实际上是返回了一组方法组合成的一个对象。
   */
  return (defaultConfig?: IFetcherConfigDefault): IFetcher => {
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
        jsonp: createFnGetWithAbort(fetcher, 'JSONP'),
        get: createFnGetWithAbort(fetcher, 'GET'),
        post: createFnPostWithAbort(fetcher, 'POST'),
        put: createFnPostWithAbort(fetcher, 'PUT'),
        patch: createFnPostWithAbort(fetcher, 'PATCH'),
        delete: createFnPostWithAbort(fetcher, 'DELETE')
      }
    };
  };
}
