import {
  MouseEvent,
  useCallback
} from 'react';

import useModelProps from './_use-model-props';
import useDispatchSetHovered from './use-dispatch-set-hovered';

export default function useHandleMouseLeave(): (e: MouseEvent<HTMLInputElement>) => void {
  const {
    onMouseLeave,
    onHoveredChange
  } = useModelProps();
  const dispatchSetHovered = useDispatchSetHovered();
  
  return useCallback((e: MouseEvent<HTMLInputElement>) => {
    dispatchSetHovered(false);
    onMouseLeave?.(e);
    onHoveredChange?.(false);
  }, [onMouseLeave, onHoveredChange, dispatchSetHovered]);
}
