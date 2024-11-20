import {
  ReactElement
} from 'react';

export interface IDatasourceItem<T = string> {
  value: T;
  label: string | ReactElement;
}
