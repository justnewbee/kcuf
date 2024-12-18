import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useHandleClose from './use-handle-close';
import useVisible from './use-visible';

export default function useEffectAutoClose(): void {
  const {
    autoClose = 0
  } = useModelProps();
  const visible = useVisible();
  const handleClose = useHandleClose();
  
  useEffect(() => {
    if (!visible || autoClose <= 0) {
      return;
    }
    
    const timer = window.setTimeout(handleClose, autoClose);
    
    return () => window.clearTimeout(timer);
  }, [autoClose, visible, handleClose]);
}
