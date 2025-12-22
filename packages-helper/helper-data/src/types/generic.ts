import {
  IBaseDataId,
  IBaseDataParentId
} from './base-data';

/**
 * 分页数据标准化
 */
export interface IPagedList<T> {
  total: number;
  page: number;
  pageSize: number;
  list: T[];
}

/**
 * 游标分页数据标准化
 */
export interface IPagedCursorList<T> {
  nextCursor: string;
  list: T[];
}

/**
 * 某些分页接口，后端给的数据只有列表，前端需根据返回转成非确定分页列表数据
 */
export interface IPagedListUncertain<T> extends Omit<IPagedList<T>, 'total'> {
  hasMore: boolean;
}

export interface ITreeItemBase extends IBaseDataId, IBaseDataParentId {}

export type TTreeItem<T extends ITreeItemBase> = T & {
  children?: TTreeItem<T>[];
};
