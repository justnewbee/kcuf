import {
  TCacheLocalGlobal
} from '../types';

interface IGlobalThis {
  __fetcher_cache_local__?: TCacheLocalGlobal;
}

export default function cacheGlobal(): TCacheLocalGlobal {
  let theCache = (globalThis as IGlobalThis).__fetcher_cache_local__;
  
  if (!theCache) {
    theCache = {};
    
    (globalThis as IGlobalThis).__fetcher_cache_local__ = theCache;
  }
  
  return theCache;
}
