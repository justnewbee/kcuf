import {
  TDatasource
} from '../../../types';

export interface IChoiceGroupCheckboxProps<T> {
  datasource: TDatasource<T>;
  value?: T[];
  defaultValue?: T[];
  onChange?(value: T[]): void;
}
