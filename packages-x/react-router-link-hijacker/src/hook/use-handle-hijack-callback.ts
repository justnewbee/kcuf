import {
  useCallback
} from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router';

import {
  IHijackResult
} from '../types';
import {
  DATA_ROUTE_REPLACE
} from '../const';

export default function useHandleHijackCallback(): (result: IHijackResult, el: HTMLElement) => string | void {
  const location = useLocation();
  const navigate = useNavigate();
  
  return useCallback((result: IHijackResult, el: HTMLElement): string | void => {
    if (location.pathname === result.pathname && location.search === result.search && location.hash === result.hash) { // 避免重复历史
      return;
    }
    
    navigate(result.href, el.hasAttribute(DATA_ROUTE_REPLACE) ? {
      replace: true
    } : undefined);
  }, [location, navigate]);
}
