import cacheGlobal from './cache-global';
import cacheGet from './cache-get';

export default function cacheRemove(key: string): void {
  const cache = cacheGet(key);
  
  if (!cache) {
    return;
  }
  
  const store = cacheGlobal();
  
  store[key] = null;
  delete store[key];
}
