import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';
import useMarkingInstance from './use-marking-instance';

export default function useEffectOptionDebugEvents(): void {
  const {
    optionDebugEvents
  } = useModelState();
  const markingInstance = useMarkingInstance();
  
  return useEffect((): void => {
    markingInstance?.updateOptions({
      debugEvents: optionDebugEvents
    });
  }, [markingInstance, optionDebugEvents]);
}
