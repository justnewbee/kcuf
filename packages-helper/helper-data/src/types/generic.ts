import {
  ELoadingStatus
} from '../enum';

/**
 * 分页数据标准化
 */
export interface IPagedList<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 某些分页接口，后端给的数据只有列表，前端需根据返回转成非确定分页列表数据
 */
export interface IPagedListUncertain<T> extends Omit<IPagedList<T>, 'total'> {
  hasMore: boolean;
}

export interface IDataWithLoading<T> {
  loading: ELoadingStatus;
  data: T | null | undefined;
  error: Error | null | undefined;
}
