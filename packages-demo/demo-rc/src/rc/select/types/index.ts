import {
  ForwardedRef,
  SelectHTMLAttributes
} from 'react';

import {
  IDatasourceItem
} from '../../../types';

export type TSelectRef = ForwardedRef<HTMLSelectElement>;

export interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  datasource?: IDatasourceItem[];
}
