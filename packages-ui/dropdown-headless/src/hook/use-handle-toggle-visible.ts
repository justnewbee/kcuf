import useModelProps from './_use-model-props';
import useDispatchSetVisible from './use-dispatch-set-visible';

export default function useHandleToggleVisible(): (visible: boolean) => void {
  const {
    disabled,
    onVisibleChange
  } = useModelProps();
  const dispatchSetVisible = useDispatchSetVisible();
  
  return (visible: boolean): void => {
    if (disabled) {
      return;
    }
    
    dispatchSetVisible(visible);
    onVisibleChange?.(visible);
  };
}
