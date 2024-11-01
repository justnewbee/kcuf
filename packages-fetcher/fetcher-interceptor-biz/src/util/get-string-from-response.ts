import {
  TResponseResult,
  TGetString
} from '../types';

export default function getStringFromResponse(o: TResponseResult, getter: TGetString): string {
  const value = typeof getter === 'function' ? getter(o) : o[getter];
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number') {
    return String(value);
  }
  
  return '';
}
