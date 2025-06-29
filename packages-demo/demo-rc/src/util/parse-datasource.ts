import {
  ReactElement
} from 'react';

import {
  IDatasourceItem,
  TDatasource,
  TDatasourceValue
} from '../types';

export default function parseDatasource<T extends TDatasourceValue>(datasource: TDatasource<T> = []): IDatasourceItem<T>[] {
  return datasource.map(v => {
    let label: string | ReactElement | undefined;
    let value: T;
    
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      value = v;
      label = String(v);
    } else {
      value = v.value;
      label = v.label;
    }
    
    return {
      value,
      label
    };
  });
}
