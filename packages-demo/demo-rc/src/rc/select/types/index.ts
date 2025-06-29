import {
  ForwardedRef,
  SelectHTMLAttributes
} from 'react';

import {
  TDatasource
} from '../../../types';

export type TSelectRef = ForwardedRef<HTMLSelectElement>;

export interface ISelectProps<T extends string | number | boolean = string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  datasource?: TDatasource<T>;
  withEmpty?: boolean;
  value?: T;
  defaultValue?: T;
  onChange?(value: T | undefined): void;
}
