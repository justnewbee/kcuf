import {
  IPagedList
} from '../types';

/**
 * 这里我们不知道后端给的数据究竟长什么样，这个方法相对比较普适，业务封装可以在此基础上，通过传入后端对象简化调用
 */
export default function normalizePagedList<T0, T = T0>(list0: T0[], total: number, page: number, pageSize: number, convert?: (o: T0) => T): IPagedList<T> {
  return {
    list: convert ? list0.map(convert) : list0 as unknown as T[],
    total,
    page,
    pageSize
  };
}
