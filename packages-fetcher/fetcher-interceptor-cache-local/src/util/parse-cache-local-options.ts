import {
  FetcherConfig
} from '@kcuf/fetcher';

import {
  ICacheLocalOptionsParsed
} from '../types';

export default function parseCacheLocalOptions(config: FetcherConfig): ICacheLocalOptionsParsed | null {
  if (!config.cacheLocal) {
    return null;
  }
  
  const {
    key = '',
    ttl = -1,
    overwrite = false
  } = config.cacheLocal === true ? {} : config.cacheLocal;
  
  return {
    key: key || config._hash!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    ttl,
    overwrite
  };
}
