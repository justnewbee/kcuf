import {
  SubmitEvent,
  useCallback
} from 'react';

import useModelProps from './_use-model-props';

export default function useHandleSubmit(): (e: SubmitEvent<HTMLFormElement>) => void {
  const {
    preventDefault = true,
    onSubmit
  } = useModelProps();
  
  return useCallback((e: SubmitEvent<HTMLFormElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
    
    onSubmit?.(e);
  }, [preventDefault, onSubmit]);
}
