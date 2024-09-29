import {
  useEffect
} from 'react';

import useInit from './use-init';
import useModelState from './_use-model-state';

export default function useEffectInit(): void {
  const init = useInit();
  const {
    everInit
  } = useModelState();
  
  useEffect(() => {
    if (!everInit) {
      init();
    }
  }, [everInit, init]);
}
