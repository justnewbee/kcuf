import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectDisable(): void {
  const {
    disabled = false
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    markingInstance?.toggleDisabled(disabled);
  }, [disabled, markingInstance]);
}
