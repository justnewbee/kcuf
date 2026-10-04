import {
  IContextForContent
} from '../types';

import useModelProps from './_use-model-props';
import useDropVisible from './use-drop-visible';
import useDispatchSetVisible from './use-dispatch-set-visible';

/**
 * 给内容用的 hook
 */
export default function useDropdown(): IContextForContent {
  const {
    onVisibleChange
  } = useModelProps();
  const visible = useDropVisible();
  const dispatchToggleVisible = useDispatchSetVisible();
  
  const handleToggleVisible = (payload: boolean): void => {
    dispatchToggleVisible(payload);
    onVisibleChange?.(payload);
  };
  const showDrop = (): void => handleToggleVisible(true);
  const hideDrop = (): void => handleToggleVisible(false);
  
  return {
    visible,
    showDrop,
    hideDrop
  };
}
