import _isEqual from 'lodash/isEqual';
import {
  useRef,
  useMemo,
  useCallback
} from 'react';
import {
  useSearchParams
} from 'react-router';

import {
  TUseRouteQueryResult
} from '../types';
import {
  decodeParams,
  encodeParams
} from '../util';

export default function useRouteQuery<T extends object>(defaults: Required<T>, key = '_'): TUseRouteQueryResult<T> {
  const refDefaults = useRef<Required<T>>(defaults);
  const [searchParams, setSearchParams] = useSearchParams();
  
  if (!_isEqual(refDefaults.current, defaults)) {
    refDefaults.current = defaults;
  }
  
  const paramsStr = searchParams.get(key) ?? '';
  
  // 使用 refDefaults 避免避免不必要的重渲染
  const params = useMemo(() => decodeParams<T>(paramsStr, refDefaults.current), [paramsStr]);
  
  const handleUpdate = useCallback((paramsUpdate: Partial<T>) => {
    const paramsStrNew = encodeParams({
      ...params,
      ...paramsUpdate
    }, defaults);
    
    if (paramsStrNew === paramsStr) {
      return;
    }
    
    if (!paramsStrNew) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, paramsStrNew);
    }
    
    setSearchParams(searchParams);
  }, [defaults, key, paramsStr, params, searchParams, setSearchParams]);
  
  return [params, handleUpdate];
}
