import {
  ReactElement
} from 'react';

import {
  IDataSourceItem
} from '../../../types';

export interface IChoiceGroupCheckboxProps<T> {
  dataSource: IDataSourceItem<T>[];
  label?: string | ReactElement;
  value?: T[];
  defaultValue?: T[];
  onChange?(value: T[]): void;
}
