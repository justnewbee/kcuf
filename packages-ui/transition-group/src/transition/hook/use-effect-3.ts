import {
  useEffect
} from 'react';

import {
  ETransactionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useHandleUpdateStatus from './use-handle-update-status';

export default function useEffect3(): void {
  const {
    in: inProp
  } = useModelProps();
  const {
    status
  } = useModelState();
  const handleUpdateStatus = useHandleUpdateStatus();
  
  useEffect(() => {
    let nextStatus = null;
    
    if (inProp) {
      if (status !== ETransactionStatus.ENTERING && status !== ETransactionStatus.ENTERED) {
        nextStatus = ETransactionStatus.ENTERING;
      }
    } else {
      if (status === ETransactionStatus.ENTERING || status === ETransactionStatus.ENTERED) {
        nextStatus = ETransactionStatus.EXITING;
      }
    }
    
    handleUpdateStatus(false, nextStatus);
  }, [inProp, status, handleUpdateStatus]);
}
