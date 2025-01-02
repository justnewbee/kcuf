import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectSetOptions(): void {
  const {
    className,
    plugins,
    image,
    markings,
    ...options
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    if (!markingInstance) {
      return;
    }
    
    markingInstance.updateOptions(options);
  }, [
    markingInstance,
    options
  ]);
}
