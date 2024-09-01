import {
  useCallback
} from 'react';

import useDispatchToggleFloatingVisible from './use-dispatch-toggle-floating-visible';

export default function useHandleToggleFloatingVisible(): (visible: boolean) => void {
  const dispatchToggleFloatingVisible = useDispatchToggleFloatingVisible();
  
  return useCallback((visible: boolean): void => {
    dispatchToggleFloatingVisible(visible);
  }, [dispatchToggleFloatingVisible]);
}