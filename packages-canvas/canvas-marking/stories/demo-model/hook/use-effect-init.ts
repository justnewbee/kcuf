import {
  useEffect
} from 'react';

import useHandleInit from './use-handle-init';

export default function useEffectInit(): void {
  const handleInit = useHandleInit();
  
  useEffect(() => {
    handleInit();
  }, [handleInit]);
}
