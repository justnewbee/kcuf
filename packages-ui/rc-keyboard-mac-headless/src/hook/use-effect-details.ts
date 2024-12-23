import {
  useEffect
} from 'react';

import {
  getEventDetails
} from '../util';

import useModelProps from './_use-model-props';
import useDispatchSetKeyDetails from './use-dispatch-set-key-details';

export default function useEffectDetails(): void {
  const {
    detailsInSpace
  } = useModelProps();
  const dispatchSetKeyDetails = useDispatchSetKeyDetails();
  
  useEffect(() => {
    if (!detailsInSpace) {
      return;
    }
    
    function onKeydown(e: KeyboardEvent): void {
      dispatchSetKeyDetails(getEventDetails(e));
    }
    
    document.addEventListener('keydown', onKeydown);
    
    return () => document.removeEventListener('keydown', onKeydown);
  }, [detailsInSpace, dispatchSetKeyDetails]);
}
