import _cloneDeep from 'lodash/cloneDeep';

interface IPromiseQueueItem<T = void, E extends Error = Error> {
  resolve(data: T): void;
  reject(err: E): void;
}

export default function singletonPromise<T>(fn: () => Promise<T>): () => Promise<T> {
  let queue: IPromiseQueueItem<T>[] | null = null;
  
  function resolveQueue(data: T): void {
    if (queue) {
      queue.forEach(v => {
        v.resolve(data ? _cloneDeep(data) : data);
      });
      
      queue = null;
    }
  }
  
  function rejectQueue(err: Error): void {
    if (queue) {
      queue.forEach(v => {
        v.reject(err);
      });
      
      queue = null;
    }
  }
  
  return (): Promise<T> => {
    if (!queue) {
      queue = [];
    }
    
    const promise = new Promise<T>((resolve, reject) => queue?.push({
      resolve,
      reject
    }));
    
    if (queue.length === 1) {
      fn().then(data => resolveQueue(data), err => rejectQueue(err));
    }
    
    return promise;
  };
}
