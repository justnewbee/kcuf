import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';

export default function useEffectDestroy(): void {
  const {
    markingInstance
  } = useModelState();
  
  useEffect(() => {
    return () => markingInstance?.destroy();
  }, [markingInstance]);
}
