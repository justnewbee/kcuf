import {
  ReactElement
} from 'react';

export interface IControllableChecked {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
}

export interface IDatasourceItem<T = string> {
  value: T;
  label?: string | ReactElement;
}

export type TDatasource<T = string> = [T] extends [string | number | boolean | undefined | null] ? (T | IDatasourceItem<T>)[] : IDatasourceItem<T>[];
