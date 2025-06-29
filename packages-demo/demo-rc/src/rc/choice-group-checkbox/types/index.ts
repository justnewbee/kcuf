import {
  TDatasource,
  TDatasourceValue
} from '../../../types';

export interface IChoiceGroupCheckboxProps<T extends TDatasourceValue = string> {
  datasource: TDatasource<T>;
  value?: T[];
  defaultValue?: T[];
  onChange?(value: T[]): void;
}
