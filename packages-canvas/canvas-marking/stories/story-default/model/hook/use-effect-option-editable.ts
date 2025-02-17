import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';
import useMarkingInstance from './use-marking-instance';

export default function useEffectOptionEditable(): void {
  const {
    optionEditable
  } = useModelState();
  const markingInstance = useMarkingInstance();
  
  return useEffect((): void => {
    markingInstance?.updateOptions({
      editable: optionEditable
    });
  }, [markingInstance, optionEditable]);
}
