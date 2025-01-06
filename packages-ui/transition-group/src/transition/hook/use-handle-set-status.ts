import {
  useCallback
} from 'react';

import {
  ETransactionStatus
} from '../enum';

import useDispatchSetStatus from './use-dispatch-set-status';
import useRefNextCallback from './use-ref-next-callback';

export default function useHandleSetStatus(): (nextState: ETransactionStatus, callback?: () => void) => void {
  const refNextCallback = useRefNextCallback();
  const dispatchSetStatus = useDispatchSetStatus();
  
  return useCallback((nextState: ETransactionStatus, callback?: () => void) => {
    dispatchSetStatus(nextState);
    
    if (callback) {
      refNextCallback.current = callback;
    }
  }, [dispatchSetStatus, refNextCallback]);
}
