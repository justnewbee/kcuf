import {
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
  const [searchParams, setSearchParams] = useSearchParams();
  
  const paramsStr = searchParams.get(key) ?? '';
  
  const params = useMemo(() => decodeParams<T>(paramsStr, defaults), [paramsStr, defaults]);
  
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
