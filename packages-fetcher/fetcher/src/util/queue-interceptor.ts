import {
  IInterceptorEject
} from '../types';

/**
 * 推拦截器入队，并返回出队方法
 */
export default function queueInterceptor<T>(interceptorQueue: T[], item: T): IInterceptorEject {
  interceptorQueue.push(item);
  
  return () => {
    const index = interceptorQueue.indexOf(item);
    
    if (index >= 0) {
      interceptorQueue.splice(index, 1);
    }
  };
}