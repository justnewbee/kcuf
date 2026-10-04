import useDispatchSetComposing from './use-dispatch-set-composing';
import useControllableValue from './use-controllable-value';
import useDispatchSetValue from './use-dispatch-set-value';

export default function useHandleInputCompositionStart(): () => void {
  const controllableValue = useControllableValue();
  const dispatchSetComposing = useDispatchSetComposing();
  const dispatchSetValue = useDispatchSetValue();
  
  return () => {
    dispatchSetComposing(true);
    dispatchSetValue(controllableValue);
  };
}
