import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  TCacheLocalGlobal,
  ICacheLocalWindow
} from '../types';

export default function cacheGlobal(): TCacheLocalGlobal {
  const win = getWindow<ICacheLocalWindow>();
  
  win.__fetcher_cache_local__ ||= {};
  
  return win.__fetcher_cache_local__;
}
