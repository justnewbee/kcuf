import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useDispatchSetMounted from './use-dispatch-set-mounted';

/**
 * 当 `props.in` 由 false → true 时，设 mounted 为 true
 */
export default function useEffectMount(): void {
  const {
    in: inProp
  } = useModelProps();
  const {
    mounted
  } = useModelState();
  const dispatchSetMounted = useDispatchSetMounted();
  
  useEffect(() => {
    if (inProp && !mounted) {
      dispatchSetMounted(true);
    }
  }, [inProp, mounted, dispatchSetMounted]);
}
