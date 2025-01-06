import { useEffect } from 'react';

import { ETransactionStatus } from '../enum';

import useModelProps from './_use-model-props';
import useHandleUpdateStatus from './use-handle-update-status';

export default function useEffect2(): void {
  const {
    appear
  } = useModelProps();
  const handleUpdateStatus = useHandleUpdateStatus();
  
  useEffect(() => {
    handleUpdateStatus(true, appear ? ETransactionStatus.ENTERING : null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
