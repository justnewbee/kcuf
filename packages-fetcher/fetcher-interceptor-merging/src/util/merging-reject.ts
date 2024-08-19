import mergingGet from './merging-get';
import mergingRemove from './merging-remove';

export default function mergingReject(key: string, err: Error): void {
  const queue = mergingGet(key);
  
  if (queue) {
    mergingRemove(key);
    
    // setTimeout 以第 0 个请求最先
    setTimeout(() => queue?.forEach(({
      reject: promiseReject
    }) => promiseReject(err)), 0);
  }
}
