import {
  IRemover
} from '../types';

export default function queueInterceptor<T>(interceptorQueue: T[], item: T): IRemover {
  interceptorQueue.push(item);
  
  return () => {
    const index = interceptorQueue.indexOf(item);
    
    if (index >= 0) {
      interceptorQueue.splice(index, 1);
    }
  };
}