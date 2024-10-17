import {
  FetcherConfig,
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import cacheReject from './cache-reject';
import parseCacheLocalOptions from './parse-cache-local-options';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, fetcherConfig: FetcherConfig): void => {
    const cacheLocal = parseCacheLocalOptions(fetcherConfig);
    
    if (cacheLocal) {
      cacheReject(cacheLocal.key, err);
    }
    
    throw err;
  };
}
