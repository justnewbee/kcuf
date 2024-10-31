import {
  useEffect
} from 'react';

import useDispatchSetKeyDetails from './use-dispatch-set-key-details';
import useModelState from './_use-model-state';

export default function useEffectClearDetails(): void {
  const {
    keyDetails
  } = useModelState();
  const dispatchSetKeyDetails = useDispatchSetKeyDetails();
  
  useEffect(() => {
    if (!keyDetails) {
      return;
    }
    
    let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      dispatchSetKeyDetails(null);
      timer = null;
    }, 3000);
    
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [keyDetails, dispatchSetKeyDetails]);
}
