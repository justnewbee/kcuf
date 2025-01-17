import {
  ChangeEvent,
  useCallback
} from 'react';

import useModelState from './_use-model-state';
import useControllableOnChange from './use-controllable-on-change';
import useDispatchSetValue from './use-dispatch-set-value';

export default function useHandleInputChange(): (e: ChangeEvent<HTMLInputElement>) => void {
  const controllableOnChange = useControllableOnChange();
  const {
    composing
  } = useModelState();
  const dispatchSetValue = useDispatchSetValue();
  
  return useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const {
      value
    } = e.target;
    
    dispatchSetValue(value);
    
    if (!composing) { // 输入法正在输入，压下 onChange
      controllableOnChange(value, 'input');
    }
  }, [controllableOnChange, composing, dispatchSetValue]);
}
