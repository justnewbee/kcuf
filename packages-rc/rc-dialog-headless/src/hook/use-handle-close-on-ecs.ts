import {
  useCallback
} from 'react';

import {
  detectFusionOverlay
} from '../util';

import useModelProps from './_use-model-props';
import useHandleClose from './use-handle-close';

/**
 * 处理 ESC 事件
 *
 * 注意会经常变，引用用到了 useHandleClose
 */
export default function useHandleCloseOnEsc(): () => void {
  const {
    esc,
    closable
  } = useModelProps();
  
  const handleClose = useHandleClose();
  
  return useCallback((): boolean | undefined => {
    // ESC 的时候优先关闭 fusion 的 overlay，如果有 fusion 的，则这边先不关
    if (detectFusionOverlay()) {
      return false;
    }
    
    if (esc === 'always' || (closable && esc)) {
      handleClose();
    }
  }, [esc, closable, handleClose]);
}
