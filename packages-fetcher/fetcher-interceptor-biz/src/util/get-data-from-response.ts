import {
  TResponseResult,
  TGetData
} from '../types';

export default function getDataFromResponse<T = unknown>(o: TResponseResult, getter?: TGetData<T>): T {
  if (typeof getter === 'function') {
    return getter(o);
  }
  
  if (typeof getter === 'string') {
    return o[getter] as T;
  }
  
  return o.data as T;
}
