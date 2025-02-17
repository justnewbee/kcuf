import {
  useEffect
} from 'react';

import useHandleDestroy from './use-handle-destroy';

export default function useEffectDestroy(): void {
  const handleDestroy = useHandleDestroy();
  
  useEffect(() => {
    return handleDestroy;
  }, [handleDestroy]);
}
