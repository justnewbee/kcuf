/**
 * 分页数据标准化
 */
export interface IPagedList<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
