import {
  IMergingQueueItem
} from '../types';

import mergingGlobal from './merging-global';

export default function mergingGet(key: string): IMergingQueueItem[] | null {
  return mergingGlobal()[key] || null;
}
