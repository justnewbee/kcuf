import {
  useEffect
} from 'react';

import useModelProps from './_use-model-props';
import useMarkingInstance from './use-marking-instance';

export default function useEffectSetData(): void {
  const {
    imageUrl,
    markingItems
  } = useModelProps();
  const markingInstance = useMarkingInstance();
  
  useEffect(() => {
    markingInstance?.setData(imageUrl, markingItems || []);
  }, [markingInstance, imageUrl, markingItems]);
}
