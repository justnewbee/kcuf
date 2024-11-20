import {
  ReactElement
} from 'react';

export interface IControllableValue<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?(value: T): void;
}

export interface IControllableChecked {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
}

export interface IDatasourceItem<T = string> {
  value: T;
  label: string | ReactElement;
}
