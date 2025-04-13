import {
  ForwardedRef,
  SelectHTMLAttributes
} from 'react';

import {
  IDatasourceItem
} from '../../../types';

export type TSelectRef = ForwardedRef<HTMLSelectElement>;

export interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  datasource?: IDatasourceItem[];
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
}
