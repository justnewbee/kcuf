import {
  useEffect
} from 'react';

import useInit from './use-init';

export default function useEffectInit(): void {
  const init = useInit();
  
  useEffect(() => {
    init();
  }, [init]);
}
