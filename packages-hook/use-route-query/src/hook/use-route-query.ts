import _isEqual from 'lodash/isEqual';
import {
  useRef,
  useMemo,
  useCallback
} from 'react';
import {
  useLocation,
  useSearchParams,
  useNavigate
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
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  if (!_isEqual(refDefaults.current, defaults)) {
    refDefaults.current = defaults;
  }
  
  // 参数中如果有数组，可能导致每次得到的 memoParams 不同，故此需要 useMemo
  const memoParams = useMemo(() => decodeParams<T>(searchParams.get(key) ?? '', refDefaults.current), [searchParams, key]);
  
  const handleUpdateQuery = useCallback((paramsUpdate: Partial<T>, pathname = location.pathname) => {
    const paramsStr = searchParams.get(key) ?? '';
    const paramsStrNew = encodeParams({
      ...memoParams,
      ...paramsUpdate
    }, refDefaults.current);
    
    if (pathname !== location.pathname) {
      navigate(`${pathname}${pathname.includes('?') ? '?' : '&'}${key}=${encodeURIComponent(paramsStrNew)}`);
      
      return;
    }
    
    if (paramsStrNew === paramsStr) {
      return;
    }
    
    if (!paramsStrNew) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, paramsStrNew);
    }
    
    setSearchParams(searchParams);
  }, [
    key,
    location, searchParams,
    navigate, setSearchParams,
    memoParams
  ]);
  
  return [memoParams, handleUpdateQuery];
}
