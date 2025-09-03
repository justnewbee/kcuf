import {
  ReactElement
} from 'react';

import {
  SelectRef,
  SelectProps
} from '../../select';

export type TSelectWithFetchRef = SelectRef;

export interface ISelectWithFetchProps<T extends object> extends Omit<SelectProps, 'datasource'> {
  fetchList(): Promise<T[]>;
  optionLabel: keyof T | ((o: T) => string | ReactElement);
  optionValue: keyof T | ((o: T) => string);
  onFetchSuccess?(list: T[]): void;
  onFetchError?(err: Error): void;
}
