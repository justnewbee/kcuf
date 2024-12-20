import {
  cloneResponseData
} from '@kcuf/fetcher';

import mergingGet from './merging-get';
import mergingRemove from './merging-remove';

export default function mergingResolve(key: string, data: unknown): void {
  const queue = mergingGet(key);
  
  if (queue) {
    mergingRemove(key);
    
    // setTimeout 以第 0 个请求最先 resolve
    setTimeout(() => queue.forEach(({
      resolve: promiseResolve
    }) => promiseResolve(cloneResponseData(data))), 0);
  }
}
