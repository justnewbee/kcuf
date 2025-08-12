import {
  useCallback
} from 'react';

import useModelProps from './_use-model-props';

export default function useHandleToggleSwitch(): () => void {
  const {
    disabled,
    value,
    onChange
  } = useModelProps();
  
  return useCallback(() => {
    if (disabled) {
      return;
    }
    
    onChange(!value);
  }, [disabled, value, onChange]);
}
