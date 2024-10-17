import {
  FetcherConfig,
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import parseCacheLocalOptions from './parse-cache-local-options';
import cacheReject from './cache-reject';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, fetcherConfig: FetcherConfig): void => {
    const cacheLocal = parseCacheLocalOptions(fetcherConfig);
    
    if (cacheLocal) {
      cacheReject(cacheLocal.key, err);
    }
    
    throw err;
  };
}
