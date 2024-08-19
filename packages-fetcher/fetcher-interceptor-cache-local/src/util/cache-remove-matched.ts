import cacheGlobal from './cache-global';

export default function cacheRemoveMatched(keyPart: string): void {
  const store = cacheGlobal();
  
  Object.keys(store).forEach(v => {
    if (v.includes(keyPart)) {
      store[v] = null;
      delete store[v];
    }
  });
}
