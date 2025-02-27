import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectSetOptions(): void {
  const modelOptions = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    if (!markingInstance) {
      return;
    }
    
    const {
      className,
      plugins,
      image,
      markings,
      ...options
    } = modelOptions;
    
    markingInstance.updateOptions(options);
  }, [markingInstance, modelOptions]);
}
