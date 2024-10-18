import {
  FetcherConfig,
  FetcherError,
  FetcherInterceptResponseRejected
} from '@kcuf/fetcher';

import parseCacheLocalOptions from './parse-cache-local-options';
import cacheReject from './cache-reject';

export default function createInterceptorResponseRejected(): FetcherInterceptResponseRejected {
  return (err: FetcherError, config: FetcherConfig): void => {
    const cacheLocal = parseCacheLocalOptions(config);
    
    if (cacheLocal) {
      cacheReject(cacheLocal.key, err);
    }
    
    throw err;
  };
}
