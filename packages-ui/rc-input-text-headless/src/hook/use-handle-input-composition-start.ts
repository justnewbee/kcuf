import {
  useCallback
} from 'react';

import useDispatchSetComposing from './use-dispatch-set-composing';
import useControllableValue from './use-controllable-value';
import useDispatchSetValue from './use-dispatch-set-value';

export default function useHandleInputCompositionStart(): () => void {
  const controllableValue = useControllableValue();
  const dispatchSetComposing = useDispatchSetComposing();
  const dispatchSetValue = useDispatchSetValue();
  
  return useCallback(() => {
    dispatchSetComposing(true);
    dispatchSetValue(controllableValue);
  }, [controllableValue, dispatchSetComposing, dispatchSetValue]);
}
