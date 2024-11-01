import {
  ICache
} from '../types';

import cacheGlobal from './cache-global';

export default function cacheGet(key: string): ICache | null {
  return cacheGlobal()[key] || null;
}
