import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectSetData(): void {
  const {
    image,
    markings
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    markingInstance?.setData(image ?? '', markings ?? []);
  }, [markingInstance, image, markings]);
}
