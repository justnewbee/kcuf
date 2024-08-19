import {
  FetcherConfig,
  FetcherError,
  FetcherFnInterceptResponseRejected
} from '@kcuf/fetcher';

import cacheReject from './cache-reject';
import parseCacheLocalOptions from './parse-cache-local-options';

export default function createInterceptorResponseRejected(): FetcherFnInterceptResponseRejected {
  return (err: FetcherError, fetcherConfig: FetcherConfig): void => {
    const cacheLocal = parseCacheLocalOptions(fetcherConfig);
    
    if (cacheLocal) {
      cacheReject(cacheLocal.key, err);
    }
    
    throw err;
  };
}
