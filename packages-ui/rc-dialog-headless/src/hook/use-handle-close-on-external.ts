import {
  useCallback
} from 'react';

import useModelProps from './_use-model-props';
import useHandleClose from './use-handle-close';

/**
 * 处理外部点击关闭
 */
export default function useHandleCloseOnExternal(): () => void {
  const {
    externalClose,
    closable
  } = useModelProps();
  const handleClose = useHandleClose();
  
  return useCallback(() => {
    if (externalClose === 'always' || (closable && externalClose)) {
      handleClose();
    }
  }, [externalClose, closable, handleClose]);
}
