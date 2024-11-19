import {
  ReactElement
} from 'react';

export interface IControllableValue<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?(value: T): void;
}

export interface IDataSourceItem<T> {
  value: T;
  label: string | ReactElement;
}
