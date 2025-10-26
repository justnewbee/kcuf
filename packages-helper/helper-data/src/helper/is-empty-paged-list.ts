import {
  IPagedList
} from '../types';

export default function isEmptyPagedList(paged: IPagedList<unknown>): boolean {
  return !paged.list.length;
}
