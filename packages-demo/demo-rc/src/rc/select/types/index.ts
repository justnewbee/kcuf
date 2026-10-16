import {
  Ref,
  SelectHTMLAttributes
} from 'react';

import {
  TDatasource
} from '../../../types';

export type TSelectRef = Ref<HTMLSelectElement>;

export interface ISelectProps<T = string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  datasource?: TDatasource<T>;
  withEmpty?: boolean;
  value?: T;
  defaultValue?: T;
  onChange?(value: T | undefined): void;
}
