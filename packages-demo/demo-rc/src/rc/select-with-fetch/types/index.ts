import {
  IDatasourceItem
} from '../../../types';
import {
  SelectRef,
  SelectProps
} from '../../select';

export type TSelectWithFetchRef = SelectRef;

export interface ISelectWithFetchProps extends Omit<SelectProps, 'datasource'> {
  fetchDatasource(): Promise<IDatasourceItem[]>;
  onFetchSuccess?(datasource: IDatasourceItem[]): void;
  onFetchError?(err: Error): void;
}
