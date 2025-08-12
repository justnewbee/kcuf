import {
  useCallback
} from 'react';

import useModelState from './_use-model-state';
import useDispatchSetValue from './use-dispatch-set-value';
import useControllableOnChange from './use-controllable-on-change';

export default function useHandleClear(): () => void {
  const controllableOnChange = useControllableOnChange();
  const {
    domInput
  } = useModelState();
  const dispatchSetValue = useDispatchSetValue();
  
  return useCallback((): void => {
    dispatchSetValue('');
    controllableOnChange('', 'clear');
    
    if (domInput) {
      try {
        domInput.focus();
      } catch (_err) {
        // ignore
      }
    }
  }, [controllableOnChange, domInput, dispatchSetValue]);
}
