import useModelContext from './_use-model-context';
import useDispatchSetValue from './use-dispatch-set-value';
import useControllableOnChange from './use-controllable-on-change';

export default function useHandleClear(): () => void {
  const controllableOnChange = useControllableOnChange();
  const {
    domInputRef
  } = useModelContext();
  const dispatchSetValue = useDispatchSetValue();
  
  return (): void => {
    dispatchSetValue('');
    controllableOnChange('', 'clear');
    
    try {
      domInputRef.current?.focus();
    } catch (_err) {
      // ignore
    }
  };
}
