import {
  IDatasourceItem,
  TDatasource
} from '../types';

export default function parseDatasource<T>(datasource?: TDatasource<T>): IDatasourceItem<T>[] {
  return datasource ? datasource.map(v => {
    if (v === null) {
      return {
        value: v,
        label: '<null>'
      };
    }
    
    if (typeof v === 'undefined') {
      return {
        value: v,
        label: '<undefined>'
      };
    }
    
    if (v === '') {
      return {
        value: v,
        label: '<empty>'
      };
    }
    
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      return {
        value: v,
        label: String(v)
      };
    }
    
    return {
      value: v.value,
      label: v.label
    };
  }) : [];
}
