import _isEqual from 'lodash/isEqual';
import {
  useRef,
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
  const paramsStr = searchParams.get(key) ?? '';
  
  if (!_isEqual(refDefaults.current, defaults)) {
    refDefaults.current = defaults;
  }
  
  const handleUpdateQuery = useCallback((paramsUpdate: Partial<T>, pathname = location.pathname) => {
    const paramsStrNew = encodeParams({
      ...decodeParams<T>(paramsStr, refDefaults.current),
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
    paramsStr
  ]);
  
  return [decodeParams<T>(paramsStr, defaults), handleUpdateQuery];
}
