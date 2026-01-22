import {
  cloneResponseData
} from '@kcuf/fetcher';

import {
  MESSAGE_TYPE_LOGIN_SUCCESS,
  MESSAGE_TYPE_LOGIN_ERROR
} from '../const';

interface IPromiseQueueItem<T = void, E extends Error = Error> {
  resolve(data: T): void;
  reject(err: E): void;
}

export default function singletonPromise<T>(fn: () => Promise<T>): () => Promise<T> {
  let queue: IPromiseQueueItem<T>[] | null = null;
  
  function resolveQueue(data: T): void {
    if (queue) {
      queue.forEach(v => {
        v.resolve(cloneResponseData(data));
      });
      
      queue = null;
    }
    
    window.postMessage({
      type: MESSAGE_TYPE_LOGIN_SUCCESS,
      payload: data
    }, location.origin);
  }
  
  function rejectQueue(err: Error): void {
    if (queue) {
      queue.forEach(v => {
        v.reject(err);
      });
      
      queue = null;
    }
    
    window.postMessage({
      type: MESSAGE_TYPE_LOGIN_ERROR,
      payload: err
    }, location.origin);
  }
  
  return (): Promise<T> => {
    if (!queue) {
      queue = [];
    }
    
    const promise = new Promise<T>((resolve, reject) => {
      queue?.push({
        resolve,
        reject
      });
    });
    
    if (queue.length === 1) {
      fn().then(data => resolveQueue(data), (err: unknown) => rejectQueue(err as Error));
    }
    
    return promise;
  };
}
