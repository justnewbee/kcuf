import {
  TDatasourceValue,
  IDatasourceItem
} from '../../../types';
import {
  SelectRef,
  SelectProps
} from '../../select';

export type TSelectWithFetchLegacyRef = SelectRef;

export interface ISelectWithFetchLegacyProps<T extends TDatasourceValue = string> extends Omit<SelectProps<T>, 'datasource'> {
  fetchDatasource(): Promise<IDatasourceItem<T>[]>;
  onFetchSuccess?(datasource: IDatasourceItem<T>[]): void;
  onFetchError?(err: Error): void;
}
