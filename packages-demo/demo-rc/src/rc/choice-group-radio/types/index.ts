import {
  TDatasource
} from '../../../types';

export interface IChoiceGroupRadioProps<T = string> {
  datasource: TDatasource<T>;
  value?: T;
  defaultValue?: T;
  onChange?(value: T): void;
}
