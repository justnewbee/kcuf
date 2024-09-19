import {
  FetcherConfig
} from '@kcuf/fetcher';

import {
  ICacheLocalOptionsParsed
} from '../types';

export default function parseCacheLocalOptions(fetcherConfig: FetcherConfig): ICacheLocalOptionsParsed | null {
  if (!fetcherConfig.cacheLocal) {
    return null;
  }
  
  const {
    key = '',
    ttl = -1,
    overwrite = false
  } = fetcherConfig.cacheLocal === true ? {} : fetcherConfig.cacheLocal;
  
  return {
    key: key || fetcherConfig._id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    ttl,
    overwrite
  };
}
