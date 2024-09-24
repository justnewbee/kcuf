import {
  IInterceptorQueueItemBase
} from '../types';

/**
 * 对拦截器进行排序，默认的 priority 是 10，如果想靠前，指定 priority 小于 10，大于等于 10 将靠后
 *
 * 建议将 priority 设定在 1-100 之间
 */
export default function filterAndSortInterceptors<T extends IInterceptorQueueItemBase>(unsorted: T[]): T[] {
  return unsorted.sort(({
    priority: priority1 = 10
  }, {
    priority: priority2 = 10
  }): number => priority1 - priority2);
}