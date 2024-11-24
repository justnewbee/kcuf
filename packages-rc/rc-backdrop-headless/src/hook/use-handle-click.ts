import {
  useCallback
} from 'react';

import useModelProps from './_use-model-props';

export default function useHandleClick(): () => void {
  const {
    closable = true,
    onClose
  } = useModelProps();
  
  return useCallback((): void => {
    if (closable) {
      onClose?.();
    }
  }, [closable, onClose]);
}
