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
}
