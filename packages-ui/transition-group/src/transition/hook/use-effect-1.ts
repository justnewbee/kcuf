import {
  useEffect
} from 'react';

import {
  ETransactionStatus
} from '../../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useDispatchSetStatus from './use-dispatch-set-status';

export default function useEffect1(): void {
  const {
    in: inProp
  } = useModelProps();
  const {
    status
  } = useModelState();
  const dispatchSetStatus = useDispatchSetStatus();
  
  useEffect(() => {
    if (inProp && status === ETransactionStatus.UNMOUNTED) {
      dispatchSetStatus(ETransactionStatus.EXITED);
    }
  }, [inProp, status, dispatchSetStatus]);
}
