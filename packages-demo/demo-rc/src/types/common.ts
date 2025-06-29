import {
  ReactElement
} from 'react';

export interface IControllableChecked {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
}

export type TDatasourceValue = string | number | boolean;

export interface IDatasourceItem<T extends TDatasourceValue = string> {
  value: T;
  label?: string | ReactElement;
}

export type TDatasource<T extends TDatasourceValue = string> = (T | IDatasourceItem<T>)[];
