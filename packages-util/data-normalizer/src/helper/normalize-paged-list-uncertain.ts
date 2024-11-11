import {
  IPagedListUncertain
} from '../types';

function normalizePagedListUncertain<T>(list0: T[], page: number, pageSize: number): IPagedListUncertain<T>;
function normalizePagedListUncertain<T0, T>(list0: T0[], page: number, pageSize: number, convert: (o: T0) => T): IPagedListUncertain<T>;

function normalizePagedListUncertain<T0, T = T0>(list0: T0[], page: number, pageSize: number, convert?: (o: T0) => T): IPagedListUncertain<T> {
  return {
    list: convert ? list0.map(convert) : list0 as unknown as T[],
    page,
    pageSize,
    hasMore: list0.length >= pageSize
  };
}

export default normalizePagedListUncertain;