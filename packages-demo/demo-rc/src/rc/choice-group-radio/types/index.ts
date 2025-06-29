import {
  TDatasource,
  TDatasourceValue
} from '../../../types';

export interface IChoiceGroupRadioProps<T extends TDatasourceValue = string> {
  datasource: TDatasource<T>;
  value?: T;
  defaultValue?: T;
  onChange?(value: T): void;
}
