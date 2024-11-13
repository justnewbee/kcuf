import {
  ReactElement,
  isValidElement
} from 'react';

import {
  TTableColumnProps
} from '../types';

export default function renderTableCell<T>(o: T, valueIndex: number, columnProps: TTableColumnProps<T>): ReactElement | string | null | undefined {
  if ('renderCell' in columnProps) {
    return columnProps.renderCell(o, valueIndex);
  }
  
  if ('dataIndex' in columnProps) {
    const value = o[columnProps.dataIndex];
     
    if (value === undefined || value === null) {
      return null;
    }
    
    if (typeof value === 'string' || isValidElement(value)) {
      return value;
    }
    
    return String(value);
  }
  
  return null;
}
