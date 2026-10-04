import {
  CompositionEvent
} from 'react';

import useControllableOnChange from './use-controllable-on-change';
import useDispatchSetComposing from './use-dispatch-set-composing';

export default function useHandleInputCompositionEnd(): (e: CompositionEvent<HTMLInputElement>) => void {
  const dispatchSetComposing = useDispatchSetComposing();
  const controllableOnChange = useControllableOnChange();
  
  return (e: CompositionEvent<HTMLInputElement>) => {
    dispatchSetComposing(false);
    controllableOnChange(e.currentTarget.value, 'composition-end');
  };
}
